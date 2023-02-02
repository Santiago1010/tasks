const cron = require('node-cron')
const TasksModel = require('./models/task.model')
const TasksService = require('./services/task.service')
const express = require('express')
const exphbs = require('express-handlebars');
const db = require('./config/database')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express()
const port = 3000

// Configurar Handlebars como motor de plantilla
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Lo siento. No puedes estar aquí.')
})

app.post('/ping', async (req, res, next) => {
    try {
        let url = req.body.url
        let cron = req.body.cron
        let response = await TasksService.pingSiteAndSaveData(url, cron)
        return res.status(200).send({ data: response })
    } catch (error) {
        next(error)
    }
})

app.get('/all/tasks', async (req, res, next) => {
    try {
        let tasks = await getAllTasks()
        return res.status(200).send({ data: tasks })
    } catch (error) {
        next(error)
    }
})

app.get('/task/:id', async (req, res, next) => {
    try {
        let id = req.params.id
        let task = await getTaskById(id)
        return res.status(200).send({ data: task })
    } catch (error) {
        next(error)
    }
})

app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)

// Obtiene todas las tareas programadas
async function getAllTasks() {
    return await TasksModel.getAll()
}

// Ejecuta una tarea
async function runTask(task) {
    // Realiza el ping a la URL y obtiene la respuesta
    let response = await TasksService.pingSite(task.url)

    // Actualiza la tarea con la respuesta del ping
    await TasksModel.update(task.id, { extracted_data: response })
}

// Programa todas las tareas
async function scheduleTasks() {
    // Obtiene todas las tareas
    let tasks = await getAllTasks()

    // Por cada tarea
    tasks.forEach(async task => {
        // Programa la tarea
        cron.schedule(task.cron_expression, async () => {
            // Ejecuta la tarea
            await runTask(task)
        })
    })
}

// Inicia la programación de las tareas
scheduleTasks()

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto: ${port}`)
})