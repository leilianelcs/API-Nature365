const { Router, query } = require('express')
const Local = require('../models/Local')

const { auth } = require('../middleware/auth')
const { axios } = require('axios')
const { openStreetMap } = require('../service/map.service')


const localRoutes = new Router()



localRoutes.post('/', async (req, res) => {
    /*
    *        #swagger.tags = ['Local'],
    *        #swagger.parameters['body'] = {
    *            in: 'body',
    *            description: 'Adiciona um novo Local',
    *            schema: {
    *                 $id_usuario: "ID do usuário responsável pelo cadastro",
    *                 $nome_rota: "Trilha da Lagoinha do Leste",
    *                 $descricao: "Trilha pela mata, percurso fácil, termina na lagoa",
    *                 $localizacao: "Av. Lagoinha, 456",
    *                 $cep: "cep"
    *            }
    *        }
    */

    try {
        const { id_usuario, nome_rota, descricao, localizacao, cep } = req.body
        
        if (!cep) {
            return res.status(400).json({ message: 'O CEP é obrigatório' })
        }

        let resposta = await openStreetMap(cep)
        console.log(resposta)
        let coordenadas = `${resposta.display_name}, Lat: ${resposta.lat}, Lon: ${resposta.lon}`;

        if (!nome_rota) {
            return res.status(400).json({ message: 'O nome da rota é obrigatório' })
        }

        if (!id_usuario) {
            return res.status(400).json({ message: 'O ID_usuário é obrigatório' })
        }

        if (!descricao) {
            return res.status(400).json({ message: 'Descrever a rota é obrigatório' })
        }

        if (!localizacao) {
            return res.status(400).json({ message: 'Forneça uma localização' })
        }

        const local = await Local.create({
            id_usuario: id_usuario,
            nome_rota: nome_rota,
            descricao: descricao,
            localizacao: localizacao,
            cep: cep,
            coordenadas: coordenadas

        });

        res.status(201).json(local)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Não foi possível cadastrar o local', error: error.message })
    }
});


localRoutes.get('/', auth,  async (req, res) => {
    /*
    *     #swagger.tags = ['Local'],
    *      #swagger.parameters['nome'] = {
    *        in: 'query',
    *        description: 'Filtrar local pelo nome',
    *        type: 'string'
    *} 
    */
    try {
        let params = {}

        if (req.query.nome) {
            params = { ...params, nome: req.query.nome }
        }

        if (req.query.duracao_horas) {
            params = { ...params, duracao_horas: req.query.duracao_horas }
        }

        const locais = await Local.findAll({
            where: params
        })

        res.json(locais)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Não foi possível listar todos os locais', error: error.message })
    }
});


localRoutes.get('/:id', auth, async (req, res) => {
    /*
    *     #swagger.tags = ['Local'],
    *      #swagger.parameters['nome'] = {
    *        in: 'query',
    *        description: 'Filtrar local pelo ID do local',
    *        type: 'string'
    *} 
    */
    try {

        const { id } = req.params

        const local = await Local.findByPk(id)

        if (!local) {
            return res.status(404).json({ message: "Local não encontrado!" })
        }

        res.json(local)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Não foi possível listar o local específico', error: error.message })
    }
});


localRoutes.delete('/:id', auth, async (req, res) => {
    /*
    *     #swagger.tags = ['Local'],
    *      #swagger.parameters['nome'] = {
    *        in: 'query',
    *        description: 'Deletar um local',
    *        type: 'string'
    *} 
    */
    const { id } = req.params

    try {
        await Local.destroy({
            where: {
                id: id
            }
        })

        res.status(204).json({})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Não foi possível excluir o local', error: error.message })
    }
})


localRoutes.put('/:id', auth, async (req, res) => {
    /*
    *        #swagger.tags = ['Local'],
    *        #swagger.parameters['body'] = {
    *            in: 'body',
    *            description: 'Altera um local cadastrado',
    *            schema: {
    *                 $id_usuario: "ID do usuário responsável pelo cadastro",
    *                 $nome_rota: "Trilha da Lagoinha do Leste",
    *                 $descricao: "Trilha pela mata, percurso fácil, termina na lagoa",
    *                 $localizacao: "Av. Lagoinha, 456",
    *                 $cep: "cep"
    *            }
    *        }
    */
    const { id } = req.params;
    const id_usuario = req.body.id_usuario; 

    try {
        const local = await Local.findByPk(id)

        if (!local) {
            return res.status(404).json({ message: 'Local não encontrado' })
        }

        // Verifica se o usuário autenticado é o mesmo que cadastrou o local
        if (local.id_usuario !== id_usuario) {
            return res.status(403).json({ message: 'Você não tem permissão para alterar este local' })
        }

        await local.update(req.body)

        res.json(local)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Não foi possível atualizar o local', error: error.message })
    }
})

module.exports = localRoutes
