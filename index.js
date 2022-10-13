const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("./user")

// Esta es la misma configuración solo que usando variables de entorno
const {config} = require('./config/index');
mongoose.connect(config.mongooseURL)

const app = express()

app.use(express.json())

const signToken = _id => jwt.sign({_id}, "mi-string-secreto")

app.post("/register", async(req, res) => {
  const {body} = req
  console.log(body)
  try{
    const isUser = await User.findOne({email: body.email})
    if(isUser){
      return res.status(403).send({message: "User already exists"})
    }
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(body.password, salt)
    const user = await User.create({email:body.email, password: hashed, salt})
    const signed = signToken(user._id)
    res.status(201).send(signed)

  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

app.post("/login", async (req, res) => {
  const {body} = req
  try{
    const user = await User.findOne({email: body.email})
    if(!user){
      return res.status(403).send({message: "Usuario o contraseña invalida"})
    } else{
      const isMatch = await bcrypt.compare(body.password, user.password)
      if(isMatch){
        const signed = signToken(user._id)
        res.status(200).send(signed)
      } else{
        res.status(403).send({message: "Usuario o contraseña invalida"})
      }
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})


app.listen(3000, () => {
  console.log("Server listening on port 3000")
})

