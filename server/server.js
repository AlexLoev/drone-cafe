const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 1337;
const bodyparser = require('body-parser');
const path = require('path');
const log = console.log;

const routerusers = require('./routers/users'); //подключаем роуты для работы с пользователями
const routerkitchen = require('./routers/kitchen'); //подключаем роуты для работы с поварами

//подключаем к нашему приложению возможность разбирать json и urlencoded body in request
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//подключаем роуты
app.use('/users/', routerusers);
app.use('/kitchen/', routerkitchen);

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
    app,
    httpServer
};