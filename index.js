const moongose = require('mongoose');
const {config} = require('./config/index');

console.log('Conectando a la base de datos');
moongose.connect(config.mongooseURL)


moongose.connect(config.mongooseURL)

const User = moongose.model('User', {
  userName: String,
  edad: Number,
}); 

const crear = async () => {
  const user = new User({
    userName: 'Chanchito Triste',
    edad: 25
  });
  const savedUser = await user.save();
  console.log(savedUser);
}

// crear()

const buscarTodo = async () => {
  const users = await User.find();
  console.log(users);
} 

// buscarTodo();

const buscar = async () => {
  const user = await User.find({userName: 'Chanchito Feliz'});
  console.log(user);
}

// buscar();

const buscarUno = async () => {
  const user = await User.findOne({userName: 'Chanchito Feliz'});
  console.log(user);
}

// buscarUno();

// const actualizar = async () => {
//   const user = await User.findOneAndUpdate({userName: 'Chanchito Feliz'}, {edad: 30});
//   console.log(user);
// }

const actualizar = async () => {
  const user = await User.findOne({userName: 'Chanchito Feliz'});
  console.log(user);
  user.edad = 35;
  await user.save(); 
}

// actualizar();

const eliminar = async () => {
  const user = await User.findOne({userName: 'Chanchito Triste'});
  console.log(user);
  if(user) {
    await user.remove();
  }
}

eliminar();