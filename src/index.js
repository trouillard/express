
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import framework from './framework';

//import helmet from 'helmet';


// CONFIGURATIONS DEFAULT
//const app = new Express();
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static',express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(cors({origin: '*'}));
//app.use(helmet());
//app.disable('x-powered-by');


// API REST DEFAULT
var rest = require('./framework');
app.get('/rest/:objets', rest.all);
app.get('/rest/:objets/:id',	rest.get);
app.post('/rest/:objets', rest.post);
app.put('/rest/:objets', rest.put);
app.delete('/rest/:objets/:id', rest.del);


// DONNES DE CONNEXION DB (config.js)
var config = require('./config');
global.pool = mysql.createPool(config.db);


// ROUTES APPLICATIVES
var routes = require('./routes');
routes.initialise(app);

// DEMARRAGE SERVEUR
app.listen(3002);
console.log("Serveur Express demarre sur le port 3002");

// TEST DB DEMARREE
framework.executeSQL("SHOW TABLES", null);


