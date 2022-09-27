const express = require('express');
const app = express();
const router = express.Router();

// Aqui importamos as rotas da nossa API
const animalRoute = require('./routes/animal-route');

app.use('/animais', animalRoute);

module.exports = app;