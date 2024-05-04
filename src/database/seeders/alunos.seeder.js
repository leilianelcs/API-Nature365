const { QueryInterface, Sequelize } = require("sequelize");
const Aluno = require("../../models/Aluno");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Aluno.bulkCreate([
            {
                email: "teste123@gmail.com",
                password: "teste123",
                nome: "Novo Aluno 1",
                data_nascimento: "1996-12-15",
                celular: "48 9 9999 9999",
                cep: "88117410",
                endereco: "Qualquer endereço"
            },
            {
                email: "123teste@gmail.com",
                password: "teste123",
                nome: "Novo Aluno 2",
                data_nascimento: "1996-12-15",
                celular: "48 9 9999 9999",
                cep: "88117410",
                endereco: "Qualquer endereço"
            }
        ])
    },

    down: async (QueryInterface, Sequelize) => {
        await Aluno.destroy({
            email: [
                "teste123@gmail.com", 
                "123teste@gmail.com"
            ] 
        })
    }
}