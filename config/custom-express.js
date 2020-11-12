require('marko/node-require').install();
require('marko/express')

/* Configuracao do comportamento do server */

const bodyParser = require('body-parser'); //Importando o modulo body parse e instanciando sei objeto a variavel e referencia.
const express = require('express')
const methodOverride = require('method-override');
const app = express();

app.use('/estatico', express.static('app/public')); // Definindo o Middleware que filtrara requisicoes ao recurso /estatico e apontara diretamente aos arquivos estaticos em app/public 

app.use(bodyParser.urlencoded({ //Definindo o Middleware quer ira capturar os dados de Formuliarios e encapsula-los no body da requisicao
    extended: true 
}))

app.use(methodOverride(function(req, res){
    if(req.body && typeof req.body == 'object' && '_method' in req.body){
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}))

const rotas = require('../app/rotas/rotas'); //Importando o modulo exportado no arquivo de rotas js e colocando usa referencia a variavel rotas.
rotas(app);

module.exports = app;


