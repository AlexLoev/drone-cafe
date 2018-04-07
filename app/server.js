const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 1337;
const bodyparser = require('body-parser');
const path = require('path');
const log = console.log;

const users = require(path.join(__dirname,'src', 'controller', 'users')); //подключаем методы для работы с пользователями
const chefs = require(path.join(__dirname,'src', 'controller', 'chefs')); //подключаем методы для работы с поварами

const routerusers = express.Router();
const routerchefs = express.Router();
app.use(express.static(path.join(__dirname,'public'))); //открываем публичный доступ к необходимым файлам (css/js/img)
app.use(express.static(path.join(__dirname,'src','view'))); //доступ к html
app.use(express.static(path.join(__dirname,'src','controller'))); //доступ к controllers

//подключаем к нашему приложению возможность разбирать json и urlencoded body in request
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//подключаем роуты
app.use('/users/', routerusers);
app.use('/chefs/', routerchefs);

app.all('/', (req, res) => {
    res.sendFile('index.html')
    // res.end('Server is working correctly');
    // res.statusCode = 200;
    // res.statusMessage = 'OK';
});

// httpServer = http.createServer(app);
app.listen(port, (err) => {
    if (err) {
        log(err);
    } else {
        log(`http listen at port ${port}`)
    }
});


module.exports = {
    port,
    // httpServer
    app
};