# Projeto final - Módulo 01 - FMT - FuturoDEV/Nature - Nature365

Orientações:

Para o funcionamento completo da API e de todas as suas funcionalidades, seguem algumas extensões e programas necessários:

## Arquivo .env
No diretório principal, crie um arquivo .env e cole dentro dele o texto que você extrairá do arquivo .env_example


## Rodar o repositório: 

### Na primeira vez é necessário instalar as dependências:
1. `npm install`
2. Se for em ambiente local: `npm install --dev`
3. `cp .env_example .env`
4. Após o passo 3, altere seu login e senha do postgres no arquivo .env e salve-o

### Para rodar o repositório em ambiente local
1. `npm run start:dev`
2. ou rodar o servidor com o Nodemon: `nodemon index.js`


-----------------------------------------*----------------------------------------


## Facilitadores: 

### Postman
https://www.postman.com/downloads/

### Node JS
https://nodejs.org/en/download/


-----------------------------------------*----------------------------------------


## Bibliotecas utilizadas durante o projeto:

### instalar o express
`npm install express --save`
### instalar o sequelize
`npm install sequelize` 
### instalar o driver do PostgreSQL
`npm install pg` 
### instalar o CLI do sequelize
`npm install -g sequelize-cli` 
### instalar o dotenv
`npm install dotenv`
### instalar o JsonWebToken ( JWT )
`npm install jsonwebtoken`
### instalar o axios
`npm install axios`
### instalar o Swagger UI
`npm install swagger-ui-express`
### instalar o Swagger AutoGen para gerar o documento Swagger de forma automatica.
`npm install --save-dev swagger-autogen`
### instalar o Nodemon
`npm install -g nodemon`
### instalar o Yup
`npm install yup`

-----------------------------------------*----------------------------------------

## Alguns comandos utilizadas durante o projeto:

## Trabalhando com migrations:
### Criar uma migration
1. `sequelize migration:generate --name nome_da_migracao`
2. `npx sequelize-cli migration:generate --name criar_tabela_alunos`
### Rodar uma migration. Opções:
1. Opção nº 1: `sequelize db:migrate`
2. Opção nº 2: `npx sequelize db:migrate`
### Reverter a última migration:
1. `sequelize-cli db:migrate:undo`
2. `npx sequelize-cli db:migrate:undo`
### Reverter todas as migration:
1. `sequelize-cli db:migrate:undo:all`

## Trabalhando com Seeders
### Criar valores iniciais no banco de dados:
1. `sequelize db:seed:all`
2. `npx sequelize db:seed:all`

## Trabalhando com Documentação:
### Gerar o documento do Swagger.json usando o AutoGen
1. `npm run swagger`

-----------------------------------------*----------------------------------------