const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Nature365",
    description: "API Rest para o projeto final do módulo 1 do #FloripaMaisTec",
    version: "1.0.0"
  },
  host: 'localhost:3000',
  security: [{"apiKeyAuth": []}],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'Token de Autenticação'
    }
  }
};

const outputFile = './src/routes/doc.swagger.json';
const routes = ['./src/server.js'];

swaggerAutogen(outputFile, routes, doc);