# Semana 10 - Introdução ao Sequelize

## Rodar o repositório:

### Na primeira vez é necessário instalar as dependencias:
1. `npm install`
2. Se for em ambiente local: `npm install --dev`
3. `cp .env_example .env`

### Para rodar o repositório em ambiente local
1. `npm run start:dev`

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

## Trabalhando com Seeders

### Criar valores iniciais no banco de dados:
1. `sequelize db:seed:all`
2. `npx sequelize db:seed:all`

## Trabalhando com Documentação:

### Gerar o documento do Swagger.json usando o AutoGen

`npm run swagger`

## Documentação do Sequelize:
https://sequelize.org/docs/v6/core-concepts/model-basics/

## Novas Bibliotecas utilizadas:

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
`npm install swagger-autogen`