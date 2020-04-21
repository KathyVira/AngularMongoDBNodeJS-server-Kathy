const {
    User,
    validate
} = require('../models/user'); // use of userSchema validate and Joi

const authMiddelware = require('../middelware/auth');
// const _ = require('lodash');

const bcrypt = require('bcrypt')
const express = require('express'); //for use of router
const router = express.Router();


router.post('/', async (req, res) => {
    console.log('in users.js router.post() ');
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('user already exist');
    // console.log(req.body);
    user = new User(req.body); //Object from user model
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); //כמה מורכבת הולכת להיות ההצפנה
    await user.save();
    res.send(user);
    
    // res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.post('/authUser', authMiddelware, async (req, res) => {
    // res.send('this is auth user');
    const user = (await User.findById(req.user._id).select('password'));
    if (!user) return res.status(400).send('user not found'); //cheak if i have the user
    res.send(user); // if i have the user
});

// router.post('/oneUser');



module.exports = router;