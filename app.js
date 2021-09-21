require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')


const databaseInitializer = require('./config/db/index')
const routes = require('./routes')

//server initialization
let app = express()

//public route configuration
app.use('/', express.static(path.join(__dirname, './public')))

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//database initialization
databaseInitializer()

//routing starts from here
app.use('/', routes)

let port = process.env.NODE_ENV === 'DEVELOPMENT' ? process.env.DEVELOPMENT_PORT || 8080 : process.env.PRODUCTION_PORT || 3001

//server listening
app.listen(port, () => {
    console.log(`server listening at port ${port}`)
})
