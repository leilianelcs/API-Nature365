const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')

const Local = connection.define('locais', {
    id_usuario: {
        type: DataTypes.STRING,
      },
    nome_rota: {
        type: DataTypes.STRING,
     },
    descricao: {
        type: DataTypes.STRING,
     },
    localizacao: {
        type: DataTypes.STRING,
    },
    cep: {
        type: DataTypes.STRING,
    },
    coordenadas: {
        type: DataTypes.STRING,
    },
})

module.exports = Local


