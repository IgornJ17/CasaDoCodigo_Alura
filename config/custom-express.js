require('marko/node-require').install();
require('marko/express')

const bodyParser = require('body-parser');
const express = require('express')
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

const rotas = require('../app/rotas/rotas');
rotas(app);

module.exports = app;


