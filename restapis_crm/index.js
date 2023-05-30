const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos

const cors = require('cors');

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
});

// crear el servidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const whitelist = ['http://localhost:3001']
const corsOptions = {
    origin: (origin, callback) => {
        const existe = whitelist.some ( dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por cors'))
        }
    }
}
// Habilitar cors
app.use(cors());

// Rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('uploads'));

// puerto
app.listen(5000);