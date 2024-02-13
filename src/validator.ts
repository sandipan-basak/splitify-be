import { body } from 'express-validator';

export const signupValidator = [
  body('username')
    .isLength({ min: 4 })
    .withMessage('Username should have at least 4 characters'),

  body('email')
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage('Email must be a valid email address'),

  body('phone_number')
    .optional({ nullable: true, checkFalsy: true })
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Phone number must be a valid phone number'),
];