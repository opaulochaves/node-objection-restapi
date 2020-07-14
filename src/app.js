require('./env');

const Knex = require('knex');
const { Model } = require('objection');
const express = require('express');
const bodyParser = require('body-parser');

const knexfile = require('../knexfile');

const errorHandler = require('./middlewares/error-handler');
const usersRoutes = require('./api/v1/users/routes');

const knex = Knex(knexfile);

Model.knex(knex);

const app = express();

app.use(bodyParser.json());
app.disable('x-powered-by');

app.use('/v1/users', usersRoutes);

app.use(errorHandler);

module.exports = { app, knex };
