const express = require('express')
const router = require('./routes')
const db = require('./database')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Lo siento. No puedes estar aquí.')
})

router(app)

app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)

app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto: ${port}`)
})