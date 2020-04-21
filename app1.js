// var text = 'Index js'
// console.log(text);
const users = require('./routes/users');
const express = require('express'); //for use of router
const router = express.Router();
const app = express();
const mongoose = require('mongoose');

const http = require('http').Server(app);



// создаем парсер для данных в формате json
const jsonParser = express.json();




mongoose.connect('mongodb://localhost/postuser', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connection ot postuser sucsess');
    })
    .catch((err) => {
        console.log(err);
    })



// app.use(express.json());
// настройка CORS
app.use('/postuser', users, function (req, res, next) {
    console.log('in app.js app.use() ');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next(); // передаем обработку запроса методу app.post("/postuser"...
});

// обработчик по маршруту localhost:3000/postuser
app.post("/postuser", jsonParser, function (request, response) {
    // debugger;
    console.log('in app.js app.post()', request.body);
    // если не переданы данные, возвращаем ошибку
    if (!request.body) return response.sendStatus(400);
    // получаем данные
    let name = request.body.name;
    let nickName = request.body.nickName;
    let age = request.body.age;
    let email = request.body.email;
    let password = request.body.password;
    let avatar = request.body.avatar;

    console.log('request.body.name: ', request.body.name);
    // имитируем некоторую обработку данных, например, изменим значение userage
    // age = age + 10;

    // // отправка данных обратно клиенту
    // response.json({
    //     "name": request.body.fullName,
    //     "nickName": nickName,
    //     "age": age,

    // });
    const User = mongoose.model('User', userSchema);
    // User.save()
    //     .then(result => console.log('insert user sussecs'))
    //     .catch();

    app.get('/postuser', (req, res) => {
        res.send('mongo db connection is working');
    });

});




app.listen(3000, () => {
    console.log('server is runnig on port 3000 on mongo ');
});