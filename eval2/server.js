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



app.use(express.urlencoded({ extended: true })) 
app.use(morgan('dev')) 
app.use(cors()) 
app.use(helmet()) 
app.use(cookieParser()) 
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
      "img-src 'self' https://images.unsplash.com data:; script-src 'self' https://cdn.jsdelivr.net; object-src 'none';"
    );
    console.log('CSP header applied to:', req.url);
    next();
  });
  




app.use(express.static(path.join(__dirname, 'public')))



app.use('/', Routes)


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
