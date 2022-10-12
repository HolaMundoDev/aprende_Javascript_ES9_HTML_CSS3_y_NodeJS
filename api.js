const express = require('express');
const mongoose = require('mongoose');
const user = require('./user.controller');
const app = express();
const port = 3000;

app.use(express.json());
// Esta es la misma configuración solo que usando variables de entorno
const {config} = require('./config/index');
mongoose.connect(config.mongooseURL)


app.get('/users', user.list);
app.post('/users', user.create);
app.get('/users/:id', user.get);
app.put('/users/:id', user.update);
app.patch('/users/:id', user.update);
app.delete('/users/:id', user.destroy);

app.use(express.static("app"))

app.get('/', (req, res) => {
  console.log(__dirname)
  res.sendFile(`${__dirname}/index.html`);
})

app.get("*", (req, res) => {
  res.status(404).send("Esta página no existe");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});