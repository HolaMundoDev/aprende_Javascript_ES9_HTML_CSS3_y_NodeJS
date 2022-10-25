const express = require('express');
const user = require('./user.controller');

const app = express();

app.get('/', user.list);
app.post('/', user.create);
app.get('/:id', user.get);
app.put('/:id', user.update);
app.patch('/:id', user.update);
app.delete('/:id', user.destroy);

const port = 3000;


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});