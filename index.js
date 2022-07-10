// Usefull Configurations
require('dotenv').config()

// Package Dependencies
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const csrf = require('csurf')
const { v4 } = require('uuid')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const { createClient } = require('redis')
const session = require('express-session')
const redisSessionStore = require('connect-redis')(session)

// Module Dependencies
// const  = require('./routes/')

const redisClient = createClient({ legacyMode: true })
redisClient.connect()

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
)

const app = express()

// Middlewares
app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(
  session({
    genid: v4,
    store: new redisSessionStore({
      client: redisClient,
      port: process.env.SESSION_PORT || 6379,
      host: process.env.SESSION_HOST || 'localhost',
      ttl: 300,
    }),
    name: process.env.SESSION_NAME || 'redis_session',
    secret: process.env.SESSION_SECRET || 'secure_session',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(csrf())
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
})

// Routes
app.use('/', (req, res) => {
  res.send(passport)
})

app.listen(process.env.BACKEND_PORT || 3000, () => {
  console.log(`Listening port ${process.env.BACKEND_PORT || 3000}`)
})
