import { check } from "express-validator";
import { UserModel } from "../models/user.model.js";
import dotenv from 'dotenv';

dotenv.config();

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const domain = process.env.DMAILDOMAIN;

// Validator function to check if email already exists
const checkFieldExists = async (field, value) => {
    const query = {};
    query[field] = value;
    const user = await UserModel.findOne(query);

    if (user) throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is already in use`);
};

export const validateSignUp = [
    check('email').isEmail().withMessage('Please Provide a valid email').custom(async (value) => {
        // validate domain
        if (!value.endsWith(domain)) throw new Error('Email must have a dmail.com domain');
        await checkFieldExists('email', value);
        return true;
    }),
    check('userName').isLength({ min: 3 }).withMessage('Username muust be at least 3 characters long').custom(async (value) => {
        await checkFieldExists('userName', value);
        return true;
    }),
    check('password').matches(regex).withMessage('Password must be at least 8 characters long, include a lowercase letter, an uppercase letter, a number, and a special character.'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) throw new Error('Passwords must match, please try again.');
        return true;
    })
];

export const validatelogin = [
    check('email').isEmail().withMessage('Please Provide a valid email').custom(async (value) => {
        // validate domain
        if (!value.endsWith(domain)) throw new Error('Email must have a dmail.com domain');
        return true;
    })
]
