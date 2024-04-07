import express, { Response, Request } from 'express';
import { executePostgresQuery } from '~/utils/db';

interface CustomRequestBody {
  amount: number;
  description: string;
  group_id?: string;
  payer: Array<string>;
  payee: Array<string>;
  currency: string;
}

interface CustomRequestUser {
  id: string;
}

const expenseRouter = express.Router();

expenseRouter.post('/add', async (req: Request, res: Response) => {
  const { amount, description, group_id, payer, payee, currency } = req.body as CustomRequestBody;

  const {id: user_id} = req.user as CustomRequestUser;

  try {
    const expenseQuery = `
      INSERT INTO expenses (description, group_id, created_at, created_by_user_id, currency)
      VALUES ($1, $2, NOW(), $3, $4)
      RETURNING expense_id;
    `;
    const expenseResult = await executePostgresQuery(expenseQuery, [description, group_id || null, user_id, currency]);
    const expenseId = expenseResult[0].id;

    // Step 2: Create payment rows for each payer and payee
    // This is a simplification. You'll need to adjust logic based on how payers and payees are determined
    const paymentQuery = `
      INSERT INTO payments (expense_id, user_id, amount, is_payee, created_at, currency)
      VALUES ($1, $2, $3, $4, NOW(), $5);
    `;
    // For each payer, create a payment row
    for (const payerId of payer) {
      await executePostgresQuery(paymentQuery, [expenseId, payerId, amount, false, currency]);
    }
    // For each payee, create a payment row with some logic to split the amount etc.
    // Placeholder logic for dividing amount equally among payees
    const amountPerPayee = amount / payee.length;
    for (const payeeId of payee) {
      await executePostgresQuery(paymentQuery, [expenseId, payeeId, amountPerPayee, true, currency]);
    }

    res.json({ message: "Expense added successfully", expenseId });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});