
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email : {
            type : String,
            trim : true,
            required : true,
            unique : true,
            lowercase: true
        },
        name : {
            type : String,
            trim: true,
            required : true
        },
        avatar : {
            type : String
        },
        hashed_password : {
            type: String,
            required: true
        },
        role : {
            type : String,
            default : 'subscriber'
        },
        resetPasswordLink : {
            data : String,
            default: ''
        }
    },
    {
        timestamps : true
    }
);


module.exports = mongoose.model('user', userSchema);