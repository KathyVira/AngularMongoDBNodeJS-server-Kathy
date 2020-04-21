const {
    User
} = require('../models/user') // for user model himself
const bcrypt = require('bcrypt'); //for password
const Joi = require('@hapi/joi'); // for validation
const express = require('express');
const router = express.Router();



//use with DB parametrs Promis (async())
router.post('/', async (req, res) => {

    //validation with joi
    const {
        error,
        value
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //with model User for use mongoose  modgoDB
    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('iinvalid email or password')

     res.json({token:user.generateAuthToken()});
    // res.send('token')
    // return res.send(user);
    // res.send('foo boo woo');
});

function validate(req) {

    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(req);
};

module.exports = router;