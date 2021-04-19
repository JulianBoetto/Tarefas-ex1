const express = require('express')
const app = express()
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const { body,validationResult } = require('express-validator');

const port = 3000
module.exports = router;

app.set('view engine', 'ejs')

app.use(express.static('public'));

const TaskModel = require('./models/task');
const { Router } = require('express');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'tarefas.db'
});

app.use(express.json())

const tasks = TaskModel(sequelize, DataTypes)

app.get('', async (req, res) => {
  res.redirect('/tasks');
})


app.get('/tasks', async (req, res) => {
  const tasksAll = await tasks.findAll();
  
  res.render('tasks', { tarefas: tasksAll, port: port});
})

app.post('/tasks', async (req, res) => {
  const body = req.body
  const tarefa =  await tasks.create({
      description: body.description,
      done: body.done
  })

  res.json({ tarefa })  
})


app.get('/tasks/:id', async (req, res) => {
  const taskID = req.params.id;
  const resID = await tasks.findByPk(taskID);

  res.render('task', { tarefa: resID, port: port })
})


app.put('/tasks/:id', async (req, res) => {
  const taskID = req.params.id;
  const body = req.body;
  const resID = await tasks.findByPk(taskID);

  resID.update({
    description: body.description,
    done: body.done
  })

  res.json({ resID })
})

app.delete('/tasks/:id', async (req, res) => {
  const taskID = req.params.id;
  const resID = await tasks.findByPk(taskID);
  try {
    resID.destroy({ where: { id: taskID }});
    // res.send(`Foi eliminado o id: ${ taskID }`);
    res.render('delete', { id: taskID, port: port })
  } catch {
    // res.send(`O id: ${ taskID }, não foi encontrado.`)
    res.render('delete', { id: taskID, port: port })
  }
  
})

// TEST

router.get('/tasks', (req, res) => {

})

router.post('/tasks', (req, res) => {

})



app.listen(port, () => {
  console.log(`Servidor pronto no localhost:${ port }!`)
})

