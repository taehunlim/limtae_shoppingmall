
const mongoose = require('mongoose');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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

// try, catch : 무조건 실행되야할 때는 if, else 보다 try 가 적합

userSchema.pre("save", async function (next) {
        try {
            console.log('entered');
            const avatar = await gravatar.url(this.email, {
                s : '200',
                r : 'pg',
                d : 'mm'
            });
            this.avatar = avatar;

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(this.hashed_password, salt);
            this.hashed_password = passwordHash;

            console.log('exited');
            next();

        }
        catch (error) {
            next(error)
        }
    });


userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.hashed_password, function (err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    });
}

module.exports = mongoose.model('user', userSchema);