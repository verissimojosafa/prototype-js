const { Router } = require('express');

const routes = Router();

const TodolistController = require('./controllers/TodolistController');

routes.get('/', TodolistController.index)
routes.get('/create', TodolistController.create)

module.exports = routes;
