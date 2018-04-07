const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 1337;
const bodyparser = require('body-parser');
const log = console.log;

const users = require('./users'); //подключаем методы для работы с пользователями
const chefs = require('./chefs'); //подключаем методы для работы с поварами

const routerusers = express.Router();
const routerchefs = express.Router();

//подключаем к нашему приложению возможность разбирать json и urlencoded body in request
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//подключаем роуты
app.use('/users/', routerusers);
app.use('/chefs/', routerchefs);

app.all('/', (req, res) => {
    res.end('Server is working correctly');
    res.statusCode = 200;
    res.statusMessage = 'OK';
});

httpServer = http.createServer(app);
httpServer.listen(port, (err) => {
    if (err) {
        log(err);
    } else {
        log(`http listen at port ${port}`)
    }
});


module.exports = {
    port,
    httpServer
};