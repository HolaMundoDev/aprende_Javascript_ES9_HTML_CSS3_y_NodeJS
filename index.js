const moongose = require('mongoose');
const {config} = require('./config/index');

moongose.connect(config.mongooseURL)

const User = moongose.model('User', {
  userName: String,
  edad: Number,
}); 

const crear = async () => {
  const user = new User({
    userName: 'Chanchito Feliz',
    edad: 15
  });
  const savedUser = await user.save();
  console.log(savedUser);
}

crear();