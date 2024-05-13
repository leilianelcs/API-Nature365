const { Router } = require("express");
const usuarioRoutes = require("./usuarios.route");
const localRoutes = require("./locais.route");
const loginRoutes = require("./login.route");

const routes = Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');
const { where } = require("sequelize");

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use('/usuarios', usuarioRoutes)
routes.use('/locais', localRoutes)
routes.use('/login', loginRoutes)
routes.use('/login/map', loginRoutes)
routes.use('/login/teste', loginRoutes)



module.exports = routes

