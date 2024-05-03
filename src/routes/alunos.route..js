const { Router, query } = require('express') // 
const Aluno = require('../models/Aluno')

const { auth } = require('../middleware/auth')
const { default: axios } = require('axios')
const { openStreetMap } = require('../service/map.service')

const alunoRoutes = new Router()


alunoRoutes.post('/', async (req, res) => {
        /*  
            #swagger.tags = ['Aluno'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona novo Aluno',
                schema: {
                    $name: 'John Doe',
                    $age: 29,
                    about: ''
            }
        },  #swagger.parameters['parameterName'] = {
                in: 'query',
                description: 'Some description...',
                type: 'number'
            }
    */

    try {
        const email = req.body.email
        const password = req.body.password
        const nome = req.body.nome
        const data_nascimento = req.body.data_nascimento
        const celular = req.body.celular
        const cep = req.body.cep
        let endereco = ""

        if (!cep) {
            return res.status(400).json({ message: 'O CEP é obrigatório' })
        }

        resposta = await openStreetMap(cep)
        console.log(resposta)
        endereco = resposta.display_name

        if (!nome) {
            return res.status(400).json({ message: 'O nome é obrigatório' })
        }

        if (!data_nascimento) {
            return res.status(400).json({ message: 'A data de nascimento é obrigatória' })
        }

        if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
            return res.status(400).json({ message: 'A data de nascimento é não está no formato correto' })
        }

        const aluno = await Aluno.create({
            email: email,
            password: password,
            nome: nome,
            data_nascimento: data_nascimento,
            celular: celular,
            cep: cep,
            endereco: endereco
        })

        res.status(201).json(aluno)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error,
            message: 'Não possível cadastrar o aluno' })
    }
})

alunoRoutes.get('/', auth, async (req, res) => {
    const alunos = await Aluno.findAll()
    res.json(alunos)
})

alunoRoutes.get('/:id', auth, async (req, res) => {
    try {

        const { id } = req.params

        const aluno = await Aluno.findByPk(id)

        if (!aluno) {
            return res.status(404).json({ message: "Usuário não encontrado!" })
        }

        res.json(aluno)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: 'Não possível listar o aluno especifico',
            error: error
        })
    }
})

module.exports = alunoRoutes