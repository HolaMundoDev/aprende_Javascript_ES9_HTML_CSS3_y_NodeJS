const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Animal = require('./animal.controller')
const port = 3000

// Esta es la misma configuración solo que usando variables de entorno
const {config} = require('./config/index');
mongoose.connect(config.mongooseURL)

app.use(express.json())

app.get('/animals', Animal.list)
app.post('/animals', Animal.create)
app.put('/animals/:id', Animal.update)
app.patch('/animals/:id', Animal.update)
app.delete('/animals/:id', Animal.destroy)

app.use(express.static('app'))

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
	res.status(404).send('Esta página no existe :(')
})

app.listen(port, () => {
	console.log('Arrancando la aplicación!')
})
