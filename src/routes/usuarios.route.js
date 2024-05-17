const { Router, query } = require('express') // 
const Usuario = require('../models/Usuario')

const { auth } = require('../middleware/auth')
const { default: axios } = require('axios')
const { openStreetMap } = require('../service/map.service')
const localRoutes = require('./locais.route')

const usuarioRoutes = new Router()

usuarioRoutes.post('/', async (req, res) => {
    /* 
    *        #swagger.tags = ['Usuário'],
    *        #swagger.parameters['body'] = {
    *            in: 'body',
    *            description: 'Adiciona um novo Usuário',
    *            schema: {
    *                $email: seuemailaqui@gmail.com,
    *                $password: "Senha de acesso do usuário com 6 dígitos",
    *                $nome: "Leiliane Costa de Sá",
    *                $sexo: "Feminino",
    *                $CPF: "123.456.789-10",
    *                $data_nascimento: "2024-12-25",
    *                celular: "48 9 9999 9999",
    *                $cep: "88010-000"
    *        }
    *    }
    */

    try {
        const email = req.body.email
        const password = req.body.password
        const nome = req.body.nome
        const sexo = req.body.sexo
        const CPF = req.body.CPF
        const data_nascimento = req.body.data_nascimento
        const celular = req.body.celular
        const cep = req.body.cep
        let endereco = ""

        if (!cep) {
            return res.status(400).json({ message: 'O CEP é obrigatório' })
        }

// Consulta o serviço de mapa para obter o endereço completo a partir do CEP
        let resposta = await openStreetMap(cep)
        console.log(resposta)
        endereco = resposta.display_name
        
        if (!email) {
            return res.status(400).json({ message: 'O email é obrigatório' })
        }

        if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return res.status(400).json({ message: 'O formato do email não está correto' })
        }

        if (!password) {
            return res.status(400).json({ message: 'O password é obrigatório' })
        }

        if (!password.match(/^\d{6}$/)) {
            return res.status(400).json({ message: 'A senha deve conter exatamente 6 dígitos' })
        }

        if (!nome) {
            return res.status(400).json({ message: 'O nome é obrigatório' })
        }

        if (!sexo) {
            return res.status(400).json({ message: 'O sexo é obrigatório' })
        }

        if (!CPF) {
            return res.status(400).json({ message: 'O CPF é obrigatório' })
        }

        if (!data_nascimento) {
            return res.status(400).json({ message: 'A data de nascimento é obrigatória' })
        }

        if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
            return res.status(400).json({ message: 'A data de nascimento não está no formato correto' })
        }

        const usuario = await Usuario.create({
            email: email,
            password: password,
            nome: nome,
            sexo: sexo,
            CPF: CPF,
            data_nascimento: data_nascimento,
            celular: celular,
            cep: cep,
            endereco: endereco
        })

        res.status(201).json(usuario)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Não foi possível cadastrar o usuário', error: error.message });
    }
})

usuarioRoutes.get('/', auth, async (req, res) => {
/*
    *     #swagger.tags = ['Usuário'],
    *      #swagger.parameters['nome'] = {
    *        in: 'query',
    *        description: 'Filtrar usuários',
    *        type: 'string'
    *} 
    */

    const usuarios = await Usuario.findAll()
    res.json(usuarios)
})



usuarioRoutes.get('/:id', auth, async (req, res) => {
/*
    *     #swagger.tags = ['Usuário'],
    *      #swagger.parameters['nome'] = {
    *        in: 'query',
    *        description: 'Filtrar usuário pelo ID do usuário',
    *        type: 'string'
    *} 
    */
    try {

        const { id } = req.params

        const usuario = await Usuario.findByPk(id)

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado!" })
        }

        res.json(usuario)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Não foi possível listar o usuário específico',
            error: error.message()
        })
    }
})

usuarioRoutes.put('/:id', auth, async (req, res) => {
    // /* 
//     *        #swagger.tags = ['Usuário'],
//     *        #swagger.parameters['body'] = {
//     *            in: 'body',
//     *            description: 'Altera um Usuário',
//     *            schema: {
//     *                $email: "seuemailaqui@gmail.com",
//     *                $password: "Senha de acesso do usuário com 6 dígitos",
//     *                $nome: "Leiliane Costa de Sá",
//     *                $sexo: "Feminino",
//     *                $CPF: "123.456.789-10",
//     *                data_nascimento: "2024-12-25",
//     *                celular: "48 9 9999 9999",
//     *                $cep: "88010-000"
//     *        }
//     *    }
//     */
    const { id } = req.params;
    const { cep } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Se o CEP for fornecido, consulta o serviço de mapa
        if (cep) {
            const resposta = await openStreetMap(cep);
            if (resposta && resposta.display_name) {
                req.body.endereco = resposta.display_name;
                req.body.latitude = resposta.lat;
                req.body.longitude = resposta.lon;
            } else {
                return res.status(400).json({ message: 'CEP inválido ou não encontrado' });
            }
        }

        // Atualiza o usuário com os novos dados, incluindo display_name, latitude e longitude
        await usuario.update(req.body);
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Não foi possível atualizar o usuário', error: error.message });
    }
});


// usuarioRoutes.put('/:id', auth, async (req, res) => {
// /* 
//     *        #swagger.tags = ['Usuário'],
//     *        #swagger.parameters['body'] = {
//     *            in: 'body',
//     *            description: 'Altera um Usuário',
//     *            schema: {
//     *                $email: 'seuemailaqui@gmail.com',
//     *                $password: "Senha de acesso do usuário com 6 dígitos",
//     *                $nome: "Leiliane Costa de Sá",
//     *                $sexo: "Feminino",
//     *                $CPF: "123.456.789-10",
//     *                data_nascimento: "2024-12-25",
//     *                celular: "48 9 9999 9999",
//     *                $cep: "88010-000"
//     *        }
//     *    }
//     */
    
//     const { id } = req.params;

//     try {
//         const usuario = await Usuario.findByPk(id);

//         if (!usuario) {
//             return res.status(404).json({ message: 'Usuário não encontrado' });
//         }

//         await usuario.update(req.body);

//         res.json(usuario);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Não foi possível atualizar o usuário', error: error.message });
//     }
// })


usuarioRoutes.delete('/:id', auth, (req, res) => {
 /*
    *     #swagger.tags = ['Usuário']
    *     #swagger.description = 'Exclui um usuário pelo ID fornecido.'
    *     #swagger.parameters['id'] = {
    *         in: 'path',
    *         description: 'ID do usuário a ser excluído',
    *         required: true,
    *         type: 'integer'
    *     }
    *     #swagger.security = [{
    *         "apiKeyAuth": []
    *     }]
    *     #swagger.responses[204] = { 
    *         description: 'Usuário excluído com sucesso'
    *     }
    *     #swagger.responses[400] = { 
    *         description: 'ID inválido'
    *     }
    *     #swagger.responses[401] = { 
    *         description: 'Não autorizado. Token de autenticação inválido ou ausente.'
    *     }
    *     #swagger.responses[404] = { 
    *         description: 'Usuário não encontrado.'
    *     }
    *     #swagger.responses[500] = { 
    *         description: 'Erro interno do servidor.'
    *     }
    */
    const { id } = req.params

    Usuario.destroy({
        where: {
            id: id
        }
    })

    res.status(204).json({})
})




module.exports = usuarioRoutes

