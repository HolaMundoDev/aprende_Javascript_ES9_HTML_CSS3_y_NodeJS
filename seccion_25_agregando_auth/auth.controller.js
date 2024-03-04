const express = require("express")
const bcrypt = require("bcrypt")
const { expressjwt } = require("express-jwt")
const jwt = require("jsonwebtoken")
const User = require("./user.model")

const {config} = require("./config")

const validateJwt = expressjwt({secret: config.secret,algorithms: ["HS256"]})

const signToken = _id => jwt.sign({_id}, config.secret)

const findAndAssignUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id)
    if (!user) {
      return res.status(401).end()
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

const isAuthenticated = express.Router().use(validateJwt , findAndAssignUser)

const Auth = {
  login: async (req,res) => {
    const {body} = req
    try{
      const user = await User.findOne({email: body.email})
      if (!user) {
        return res.status(401).send("Usuario y/o contraseña inválida")
      } else {
        const isMatch = await bcrypt.compare(body.password, user.password)
        if (isMatch) {
          const signed = signToken(user._id)
          return res.status(200).send(signed)
        } else {
          return res.status(401).send("Usuario y/o contraseña inválida")
        }
      }} catch (error) {
      return res.status(500).send(error.message)
    }
  },
  register: async(req, res) => {
    const {body} = req
    try {
      const isUser = await User.findOne({email: body.email})
      if (isUser) {
        return res.status(401).send("Usuario ya existe")
      } else{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(body.password, salt)
        const user = await User.create({
          email: body.email,
          password: hash,
          salt
        })
        const signed = signToken(user._id)
        return res.status(200).send(signed)
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}

module.exports = {Auth, isAuthenticated}

