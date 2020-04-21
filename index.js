// var text = 'Index js'
// console.log(text);
const userSchema = require('./models/user'); //connect to the users'''
const auth = require('./routes/auth'); // connect to the auth
const users = require('./routes/users'); // connect to the auth
const cors = require('cors');

// const user = require('./models/user');

const express = require('express'); //for use of router
const mongoose = require('mongoose');

// const router = express.Router();

const app = express();
const http = require('http').Server(app);


mongoose.connect('mongodb://localhost/postuser', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        debugger;
        console.log('connection from index.js to postuser sucsess');
    })
    .catch(err => {
        debugger;
        console.log(err);
    })



// настройка CORS
app.use(cors());
app.all('/*', function (req, res, next) {
    debugger;
    console.log('in index.js app.all() ');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next(); // передаем обработку запроса методу app.post("/postuser"...
});


// создаем парсер для данных в формате json
const jsonParser = express.json();

// обработчик по маршруту localhost:3000/postuser
app.post("/postuser", jsonParser, function (request, response) {
    // debugger;
    console.log('in index.js app.post()', request.body);
    // если не переданы данные, возвращаем ошибку
    if (!request.body) return response.sendStatus(400);
    // получаем данные
    let userName = request.body.userName;
    let nickName = request.body.nickName;
    let age = request.body.age;
    let email = request.body.email;
    let password = request.body.password;
    let avatar = request.body.avatar;

    console.log('request.body.userName: ', request.body.userName);
    // имитируем некоторую обработку данных, например, изменим значение userage
    // age = age + 10;

    // // отправка данных обратно клиенту
    // response.json({
    //     "name": request.body.fullName,
    //     "nickName": nickName,
    //     "age": age,

    // });
    const User = mongoose.model('User', userSchema);
    User.save()
        .then(result => console.log('insert user sussecs'))
        .catch();

    app.get('/postuser', (req, res) => {
        res.send('mongo db in index.js connection is working');
    });

});


app.use(express.json());
app.use('/postusers', users);
// app.use('/postusers/oneUser', user);

http.listen(3000, () => {
    console.log('server is runnig on port 3000 on mongo  http.listen()');
});