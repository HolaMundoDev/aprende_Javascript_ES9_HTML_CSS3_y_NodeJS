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
  }
}

window.onload = () => {
  loadInitialTemplate();
  addFormListener();
}