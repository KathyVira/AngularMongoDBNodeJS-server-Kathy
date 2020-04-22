const Joi = require('@hapi/joi'); // for validaiton
const mongoose = require('mongoose'); // connect to mongoDB

const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        // required: true,
        minlength: 2,
        maxlength: 255
    },
    nickName: {
        type: String,
        // required: true,
        minlength: 2,
        maxlength: 255
    },
    age: {
        type: String,
        // required: true,
        minlength: 2,
        maxlength: 3
    },
    email: {
        type: String,
        // required: true,
        minlength: 2,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        // required: true,
        minlength: 2,
        maxlength: 1024
    },
    avatar: {
        type: String,
        // required: true,
        minlength: 2,
        maxlength: 255
    }
    // createdAt: {
    //     type: Date,
    //     default: Date.now()
    // }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
    }, config.jwtKey);
    return token;
    // console.log(token);

};




const User = mongoose.model('User', userSchema);

function validaiteUser(user) {
    const schema = Joi.object({
        userName: Joi.string().min(2).max(255).required(),
        nickName: Joi.string().min(2).max(255).required(),
        age: Joi.string().min(2).max(3).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(2).max(1024).required(),
        avatar: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(user);
}


exports.User = User; // החוצה export
exports.validate = validaiteUser; // החוצה export