const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')

const Usuario = connection.define('usuarios', {
    email:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    nome: {
        type: DataTypes.STRING,
    },
    sexo: {
        type: DataTypes.STRING,
    },
    CPF: {
        type: DataTypes.STRING,
    },
    data_nascimento: {
        type: DataTypes.DATE,
    },
    celular: {
        type: DataTypes.STRING,
    },
    cep: {
        type: DataTypes.STRING,
    },
    endereco: {
        type: DataTypes.STRING,
    }
})

module.exports = Usuario



