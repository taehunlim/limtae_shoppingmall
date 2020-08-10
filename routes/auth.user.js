
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY)

const userModel = require('../models/auth.model');


// @route   POST http://localhost:5000/auth/register
// @desc    Register user / send confirm mail
// @access  PUBLIC
router.post('/register', (req, res) => {

    // 이메일 존재여부 -> token 발행 -> send email

    const { name, email, password } = req.body;

    //catch 로 err 를 잡을게 아니라면 then 보다는 exec 가 적합
    userModel
        .findOne({email})
        .exec((err, user) => {
            if(user) {
                return res.status(400).json({
                    msg : "The email already exists"
                });
            }
            else {
                // 인증용 token 발행
                const token = jwt.sign(
                    { name, email, password },
                    process.env.JWT_ACCOUNT_ACTIVATION,
                    { expiresIn : '10m' }
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

});

// @route   POST http://localhost:5000/auth/login
// @desc    logged in user / return jwt
// @access  PUBLIC
router.post('/login', (req, res) => {

});




module.exports = router;

