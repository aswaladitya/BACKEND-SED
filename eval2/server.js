// File | Responsibility
// server.js / app.js | App setup, config, middleware, route connection, server launch
// routes/*.js | Define how to respond to specific URLs


const express = require('express')
const path = require('path')

const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
const PORT = 8080
const Routes = require('./routes')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) 

//dirname is os free and shows pwd


app.use(morgan('dev')) 
app.use(cors()) 
app.use(helmet()) 
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser()) 
app.use(bodyParser.json())




app.use(express.static(path.join(__dirname, 'public')))



app.use('/', Routes) // '/' is prefixed before any route from router

// If you change it to:
// app.use('/api', Routes)
// Now all the routes in Routes will be prefixed with /api:
// / → /api/
// /about → /api/about





//app.use is func with no param after that inside () is whole callback func

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
})



// Port is the param of listen and after that inside () is the callback functn which has no params in this case

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
