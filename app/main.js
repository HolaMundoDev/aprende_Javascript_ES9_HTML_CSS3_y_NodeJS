const loadInitialTemplate = () => {
  const template =  /*html*/`
    <h1>Usuarios</h1>
    <form id="user-form">
      <div>
        <label>Nombre</label>
        <input name="name">
      </div>
      <div>
        <label>Apellido</label>
        <input name="lastname">
      </div>
      <button type="submit">Guardar</button>
    </form>
    <ul id="user-list"></ul>
  `
  const body = document.querySelector('body');
  body.innerHTML = template;
}

const getUsers = async () => {
  const response = await fetch('/users');
  const users = await response.json();
  const template = user => /*html*/`
    <li>
      ${user.name} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
    </li>
  `

  const userList = document.getElementById("user-list");
  userList.innerHTML = users.map(user => template(user)).join('');
}

const addFormListener = () => {
  const userForm = document.getElementById("user-form")
  userForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(userForm);
    const data = Object.fromEntries(formData);
    await fetch('/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    userForm.reset();
    getUsers();
  }
}

window.onload = () => {
  loadInitialTemplate();
  addFormListener();
  getUsers();
}