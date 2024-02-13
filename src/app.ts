import dotenv from 'dotenv';
dotenv.config({ path: './.env.dev' });

import express from 'express'
import authRouter from '~/routes/auth';

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend server running!!')
});

app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
});