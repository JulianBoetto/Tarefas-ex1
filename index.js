const express = require('express')
const app = express()
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'tarefas.db'
  });

app.get('/test', (req, res) => {
  res.send('Hi!')
})

app.listen(3000, () => console.log('Servidor pronto!'))