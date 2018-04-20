const express = require('express');
/**стартуем сервер */
var app = require('./server/server').app

app.use(express.static('app')); //открываем публичный доступ к файлам приложения
app.get('/', (req, res) => {
    res.sendFile('index.html')
});