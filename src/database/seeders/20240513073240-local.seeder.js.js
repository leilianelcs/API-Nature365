const { QueryInterface, Sequelize } = require("sequelize");
const Local = require("../../models/Local");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Local.bulkCreate([
            {
                id_usuario: "1",
                nome_rota: "Trilha da Lagoinha do Leste",
                descricao: "Trilha pela mata, percurso fácil, termina na lagoa",
                localizacao: "Av. Lagoinha, 456",
                cep: "88101-020",
                coordenadas: "Endereço da rota indicada gerada pela API"
            },
            {
                id_usuario: "1",
                nome_rota: "Projeto Lontra",
                descricao: "Centro de reabilitação e observação de lontras",
                localizacao: "R. Florianópolis",
                cep: "88117-410",
                coordenadas: "Endereço da rota indicada gerada pela API"
            },
            {
                id_usuario: "3",
                nome_rota: "Ilha do Campeche",
                descricao: "Ilha preservada com trilhas e praias",
                localizacao: "Ilha do Campeche - Florianópolis",
                cep: "88117-410",
                coordenadas: "Endereço da rota indicada gerada pela API"
            },
           
        ])
    },


    down: async (QueryInterface, Sequelize) => {
        await Local.destroy({
            nome_rota: [
                "Trilha da Lagoinha do Leste",
                "Projeto Lontra"
            ] 
        })
    }
}