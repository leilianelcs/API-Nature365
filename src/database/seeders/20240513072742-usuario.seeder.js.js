const { QueryInterface, Sequelize } = require("sequelize");
const Usuario = require("../../models/Usuario");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Usuario.bulkCreate([
            {
                email: "leiliane1@gmail.com",
                password: "123456",
                nome: "Leiliane Costa",
                sexo: "Feminino",
                CPF: "12345678910",
                data_nascimento: "1985-04-11",
                celular: "48 9 9999 9999",
                cep: "88117-410",
                endereco: "Ilha da Magia"
            },
            {
                email: "juliano1@gmail.com",
                password: "123456",
                nome: "Juliano Nascimento",
                sexo: "Masculino",
                CPF: "10987654321",
                data_nascimento: "1986-04-11",
                celular: "48 9 9999 9999",
                cep: "88010-000",
                endereco: "Home sweet home"
            },
            {                
            email: "julia1@gmail.com",
            password: "654321",
            nome: "Julia Nascimento",
            sexo: "Feminino",
            CPF: "111.222.333-44",
            data_nascimento: "2014-04-17",
            celular: "48 9 9999 9999",
            cep: "88117410",
            endereco: "Minha casa"
        }
    ])
    },

    down: async (QueryInterface, Sequelize) => {
        await Usuario.destroy({
            email: [
                "leilianelcs@gmail.com", 
                "julianojcn3@gmail.com",
                "julia@gmail.com"
            ] 
        })
    }
}