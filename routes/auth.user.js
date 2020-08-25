
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const sgMail = require('@sendgrid/mail');
const _ = require('lodash');
sgMail.setApiKey(process.env.MAIL_KEY)

const userModel = require('../models/auth.model');

const {
    validSignUp, validLogin, forgotPasswordValidator, resetPasswordValidator
} = require('../config/validation');


const tokenGenerator = (payload, secret, time) => {
    return jwt.sign(
        payload,
        secret,
        { expiresIn: time }
    )
}



// @route   POST http://localhost:5000/auth/register
// @desc    Register user / send confirm mail
// @access  PUBLIC
router.post('/register', validSignUp, (req, res) => {

    // 이메일 존재여부 -> token 발행 -> send email

    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors)
    } else {
        //catch 로 err 를 잡을게 아니라면 then 보다는 exec 가 적합
        userModel
            .findOne({email})
            .exec((err, user) => {
                if(user) {
                    return res.status(400).json({
                        errors : "The email already exists"
                    });
                }
                else {
                    // 인증용 token 발행
                    // const token = jwt.sign(
                    //     { name, email, password },
                    //     process.env.JWT_ACCOUNT_ACTIVATION,
                    //     { expiresIn : '10m' }
                    // );

                    const token = tokenGenerator(
                        {name, email, password},
                        process.env.JWT_ACCOUNT_ACTIVATION,
                        '10m'
                    );

                    console.log(token);

                    // 어떤 내용으로 mail 을 보낼건지 정의
                    const emailData = {
                        from : process.env.EMAIL_FROM,
                        to : email, //회원가입하는 이메일
                        subject : 'Account activation link',
                        html : `
                    <h1>Please use the following to activate your account</h1>
                    <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                    <hr/>
                    <p>This email may contain sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                    `
                    };

                    // 메일 보내기
                    sgMail
                        .send(emailData)
                        .then(() => {
                            res.status(200).json({
                                message : `Email has been sent to ${email}`
                            })
                        })
                        .catch(err => {
                            res.status(400).json({
                                success : false,
                                error : err
                            })
                        })
                }
            })
    }
});

// @route   POST http://localhost:5000/auth/activation
// @desc    Activation Account from confirm email
// @access  PRIVATE
router.post('/activation', (req, res) => {
    const { token } = req.body;

    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    errors : "Expired Link, sign up again"
                });
            }
            else {
                const {name, email, password} = jwt.decode(token);

                const newUser = new userModel({
                    name, email,
                    hashed_password : password
                })

                newUser
                    .save((err, user) => {
                        if(err) {
                            return res.status(401).json({
                                errors : err
                            });
                        }
                        else {
                            res.status(200).json({
                                success : true,
                                message : 'SignUp Success',
                                userInfo : user
                            })
                        }
                    });


            }
        })
    }
});



// @route   POST http://localhost:5000/auth/login
// @desc    logged in user / return jwt
// @access  PUBLIC
router.post('/login', validLogin, (req, res) => {


    // 이메일 유무 체크 -> password 검증 -> login(return token)

    const { email, password } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json(errors)
    } else {
        userModel
            .findOne({email})
            .exec((err, user) => {
                if(err || !user) {
                    return res.status(400).json({
                        errors : "The email dose not exist. Please Sign up"
                    });
                }
                else {
                    user.comparePassword(password, (err, isMatch) => {
                        if(err || isMatch === false) {
                            return res.status(400).json({
                                errors : "password dose not match"
                            })
                        }
                        else {

                            res.status(200).json({
                                user,
                                message: 'successful login',
                                token: tokenGenerator(
                                    { _id : user._id },
                                    process.env.JWT_SECRET,
                                    "7d"
                                ),
                            })
                        }
                    })
                }
            })
    }
});


// @route   PUT http://localhost:5000/auth/forgotpassword
// @desc    forgot Password
// @access  PUBLIC
router.put('/forgotpassword', forgotPasswordValidator, (req, res) => {

    const { email } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json(errors);
    } else {
        userModel
            .findOne({email}, (err, user) => {
                const token = tokenGenerator(
                    { _id : user._id },
                    process.env.JWT_RESET_PASSWORD,
                    "10m"
                )

                const emailData = {
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: `Password Reset link`,
                    html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                    <hr />
                    <p>This email may contain sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                    `
                };

                return user.updateOne({ resetPasswordLink: token }, (err, success) => {
                    if(err) {
                        return res.status(400).json({
                            error : 'Database connection error on user password forgot request'
                        });
                    }
                    else {
                        sgMail
                            .send(emailData)
                            .then(() => {
                                res.status(200).json({
                                    message : `Email has been sent to ${email}. Follow the instruction to activate your account`
                                })
                            })
                            .catch(err => {
                                res.status(404).json({
                                    msg : err.message
                                });
                            })
                    }
                })


            })
    }

})


// @route   PUT http://localhost:5000/auth/resetpassword
// @desc    Reset Password
// @access  PRIVATE
router.put('/resetpassword', resetPasswordValidator, (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    const errors = validationResult(req);

    if( !errors.isEmpty()) {
        return res.status(422).json(errors)
    }
    else {
        if(resetPasswordLink) {
            jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err, decoded) => {
                if(err) {
                    return res.status(400).json({
                        error : 'Expired link. try again'
                    })
                }
                else {
                    userModel
                        .findOne({resetPasswordLink}, (err, user) => {
                            if(err || !user) {
                                return res.status(400).json({
                                    error : ' something went wrong. try later'
                                })
                            }
                            const updateFields = {
                                hashed_password: newPassword,
                                resetPasswordLink: ''
                            };
                            user = _.extend(user, updateFields) //user 에 updateFields 를 밀어 넣는다

                            user
                                .save((err, result) => {
                                    if(err) {
                                        return res.status(400).json({
                                            error : 'Error resetting user password'
                                        })
                                    }
                                    else {
                                        res.status(200).json({
                                            message : 'great! now you can login with your new password'
                                        })
                                    }
                                })

                        })
                }
            })
        }
    }
});


module.exports = router;

