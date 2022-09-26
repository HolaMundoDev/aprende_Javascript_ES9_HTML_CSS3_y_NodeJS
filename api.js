const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send('Chanchito feliz');
});

app.post('/', (req, res) => {
  res.status(201).send('Creando chanchito');
});

app.get('/:id', (req, res) => {
  console.log(req.params);
  res.status(200).send(req.params);
});

app.put('/:id', (req, res) => {
  console.log(req.params);
  res.status(204)
});

app.delete('/:id', (req, res) => {
  res.status(204)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});