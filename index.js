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

