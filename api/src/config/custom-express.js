const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const rotasCadAuth = require('../app/rotas/signin-signup');
const inicioCliente = require('../app/rotas/inicio-cliente');
const inicioEmpresa = require('../app/rotas/inicio-empresa');
const servicoEmpresa = require('../app/rotas/sevicos-empresa');
const reservaCliente = require('../app/rotas/reservas-cliente');

rotasCadAuth(app);

//Rotas referente ao cliente
inicioCliente(app);
reservaCliente(app);

//Rotas referente a empresa
inicioEmpresa(app);
servicoEmpresa(app);

module.exports = app;