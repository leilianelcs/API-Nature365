const { Router, query } = require('express') // 
const Aluno = require('../models/Aluno')
const axios = require('axios');

const { sign } = require('jsonwebtoken')

const loginRoutes = new Router()

loginRoutes.get('/bem_vindo', (req, res) => {
    res.json({ name: 'Bem vindo' })
})

loginRoutes.get('/teste/:cep', async (req, res) => {
        const cep = req.params.cep;

        try {
            const resultado = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`);
            console.log(resultado.data)
            res.status(200).json(resultado.data);
        } catch (error) {
            console.error('Erro ao consultar o CEP:', error);
            res.status(500).send({ error: 'Erro ao processar a solicitação' });
        }
})


loginRoutes.get('/map/:cep', async (req, res) => {
    const cep = req.params.cep;
    
    try {
        // Consulta o CEP na API Nominatim para obter as coordenadas
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`);
        
        if (response.data && response.data.length > 0) {
            // Extrai as coordenadas do resultado da consulta
            const { lat, lon } = response.data[0];
          
            // Gera o link do Google Maps com as coordenadas
            const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

            res.send({ googleMapsLink });
        } else {
            res.status(404).send({ error: 'CEP não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        res.status(500).send({ error: 'Erro ao processar a solicitação' });
    }
})

loginRoutes.post('/', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if (!email) {
            return res.status(400).json({ message: 'O email é obrigatório' })
        }

        if (!password) {
            return res.status(400).json({ message: 'O password é obrigatório' })
        }

        const aluno = await Aluno.findOne({
            where: {email:email, password:password}
        })

        if(!aluno){
            return res.status(404).json({ error: 'Nenhum aluno corresponde a email e senha fornecidos!' })
        }

        const payload = {sub: aluno.id, email: aluno.email, nome: aluno.nome}

        const token = sign(payload, process.env.SECRET_JWT)        

        res.status(200).json({Token: token})

    } catch (error) {
        return res.status(500).json({ error: error, message: 'Algo deu errado!' })
    }
})




module.exports = loginRoutes
