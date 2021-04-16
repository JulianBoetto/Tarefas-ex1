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

app.post('/tasks', (req, res) => {
    const body = req.body

    res.json(body)
    res.end('Post')
})

app.listen(3000, () => console.log('Servidor pronto!'))