const { Router, query } = require('express') // 
const Usuario = require('../models/Usuario')
const axios = require('axios');

const { sign } = require('jsonwebtoken')

const loginRoutes = new Router() 


loginRoutes.post('/', async (req, res) => {
 /*
    *     #swagger.tags = ['Login']
    *     #swagger.description = 'Autenticação de usuário.'
    *     #swagger.parameters['body'] = {
    *         in: 'body',
    *         description: 'Dados de autenticação',
    *         schema: {
    *             email: 'seuemailaqui@gmail.com',
    *             password: 'Senha de acesso do usuário com 6 dígitos'
    *         },
    *         example: {
    *             email: 'usuario@example.com',
    *             password: '123456'
    *         }
    *     }
    *     #swagger.responses[200] = { 
    *         description: 'Autenticação bem-sucedida.',
    *         schema: {
    *             Token: 'token_jwt_aqui'
    *         }
    *     }
    *     #swagger.responses[400] = { 
    *         description: 'Requisição inválida. Verifique os parâmetros.'
    *     }
    *     #swagger.responses[404] = { 
    *         description: 'Usuário não encontrado.'
    *     }
    *     #swagger.responses[500] = { 
    *         description: 'Erro interno do servidor.'
    *     }
    */


    try {
        const email = req.body.email
        const password = req.body.password

        if (!email) {
            return res.status(400).json({ message: 'O email é obrigatório' })
        }

        if (!password) {
            return res.status(400).json({ message: 'O password é obrigatório' })
        }


        //Validação de email e senha
        if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return res.status(400).json({ message: 'O formato do email não está correto' })
        }
        
        if (!password.match(/^\d{6}$/)) {
           return res.status(400).json({ message: 'A senha deve conter exatamente 6 dígitos' })
        }
             
        const usuario = await Usuario.findOne({
            where: {email:email, password:password}
        })

        if(!usuario){
            return res.status(404).json({ error: 'Nenhum usuário corresponde a email e senha fornecidos!' })
        }

        const payload = {sub: usuario.id, email: usuario.email, nome: usuario.nome}

        const token = sign(payload, process.env.SECRET_JWT)        

        res.status(200).json({Token: token})

    } catch (error) {
        return res.status(500).json({ error: error, message: 'Algo deu errado!' })
    }
})

module.exports = loginRoutes  

