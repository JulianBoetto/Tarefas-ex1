const express = require('express')
const app = express()
const { Sequelize, DataTypes, json } = require('sequelize');

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.static('public'));

const TaskModel = require('./models/task')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'tarefas.db'
});

app.use(express.json())

const tasks = TaskModel(sequelize, DataTypes)





app.get('/tasks', async (req, res) => {
  const tasksAll = await tasks.findAll();
  
  res.render('tasks', { tarefas: tasksAll})
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

  res.json(resID);
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
    resID.destroy({ where: { id: taskID }})
    res.send(`Foi eliminado o id: ${ taskID }`);
  } catch {
    res.send(`O id: ${ taskID }, não foi encontrado.`)
  }
  
})


app.listen(3000, () => {
  console.log('Servidor pronto!')
})