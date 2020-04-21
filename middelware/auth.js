// //small middalwerw
// const jwt = require('jsonwebtoken');
// const config = require('config');


// //we wont to chack the token if he corect from the request
// module.exports = (req, req, next) => {
//     const token = req.header('x-auth-token'); //not must to finding this name of property
//     if (!token) return res.status(401).send('access denied');

//     // we wont use route spase were i chack all data

//     res.send(token);
// }

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('access denied');

    try {
        const userDecode = jwt.verify(token, config.get('jwtKey'));
        req.user = userDecode;
        console.log(req.user);
        next();
        //cheak if the token correct
    } catch (err) {
        //cache the error
        res.status(400).send('invalid token');
    }


};