// var text = 'Index js'
// console.log(text);
const userSchema = require('./models/user'); //connect to the users'''
const auth = require('./routes/auth'); // connect to the auth
const users = require('./routes/users'); // connect to the auth midalwear
const cors = require('cors');

// const user = require('./models/user');
// מודולים מוכנים
const express = require('express'); //for use of router
const mongoose = require('mongoose'); //שימוש בחיבור ל MONGODB 

// const router = express.Router();

const app = express();
const http = require('http').Server(app); // קישור בין NODE ל EXPRESS


mongoose.connect('mongodb://localhost/postuser', //מעברים את הסטרינג של הקונקט עם שם של הDB כמו שקרנו לו בMONGO
        { // דבר חדש יחסית אך בלי זה נותן הערות מיותרות - מפרסר את הנתונים שהוא מקבל חזרה
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) //מחזירה PROMISS לכן מנסים לתפוס מה קורה בהצלחה ומה קורה בשגיה 
    .then(() => {
        debugger;
        console.log('connect from index.js to postuser sucsess');
    })
    .catch(err => {
        debugger;
        console.log(err);
    });



// настройка CORS
app.use(cors());
app.all('/*', function (req, res, next) {

    console.log('in index.js app.all() ');
    // console.log(res);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next(); // передаем обработку запроса методу app.post("/postuser"...
});


// создаем парсер для данных в формате json
const jsonParser = express.json();


app.use(express.json());
app.use('/postuser/users', users); //midellwear כל פעם שיש לך בקשה לכאן צריך לעבור דרך USERS
app.use('/postusers/authUser', auth);


const port = 3000;
http.listen(port, () => {
    console.log(`server is runnig on port ${port} on mongo  http.listen()`);
});