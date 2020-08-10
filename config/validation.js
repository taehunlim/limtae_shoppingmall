
const { check } = require('express-validator');

exports.validSignUp = [

    check('name', 'name is required').notEmpty()
        .isLength({ min : 4, max : 32 })
        .withMessage('name must be between 3 to 32 characters'),
    check('email')
        .isEmail()
        .withMessage('Must be valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password')
        .isLength({min : 6})
        .withMessage("password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage('password must contain a number')
]

exports.validLogin = [
    check('email')
        .isEmail()
        .withMessage('Must be valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password')
        .isLength({min : 6})
        .withMessage("password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage('password must contain a number')

]

exports.validFindPassword = [
    check('email')
        .isEmail()
        .withMessage('Must be valid email address')
]