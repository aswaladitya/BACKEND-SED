const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')

const usersFile = path.join(__dirname, '/public/db/users.json') // database JSON  one

const hotels = require('./data/hotels')    //  Dynamic Data Json one


const pages = ['index', 'about','resorts', 'experiences', 'contact', 'dashboard', 'login'] // removed /hotels from here

pages.forEach(page => {
    router.get(`/${page === 'index' ? '' : page}`, (req, res) => 
        res.render(page)
    )
})

// Add /hotels here for static data
router.get('/hotels', (req, res) => {
    res.render('hotels', { hotels })
  })


router.get('/crash', (req, res, next) => {
    throw new Error('Oops! Something broke.') // on console but on web ill print {"error":"Something went wrong!"} from server.js
})


router.post('/login', (req, res) => {
    const { username, password } = req.body // req.body holds the data sent by html req and which is parsed by express.json

    fs.readFile(usersFile, 'utf-8', (err, data) => {

        if (err) return res.redirect('/login?error=server')

        let users = JSON.parse(data || '[]')
        //Converts the file's JSON string to a JavaScript array.
        //Defaults to an empty array ([]) if file is empty.

        const user = users.find(u => u.username === username && u.password === password) // u is users object 

        if (user) { 
            return res.status(302).redirect('/?login=true') 
          } else {   
            return res.redirect('/?login=false')
          }
    })
})


router.post('/register', (req, res) => {

    const { username, password } = req.body

    fs.readFile(usersFile, 'utf-8', (err, data) => {

        let users = JSON.parse(data || '[]') // json to arr

        users.push({ username, password }) 
                                                                            // Json.parse -- Json to arr
        fs.writeFile(usersFile, JSON.stringify(users, null, 2), (writeErr) => { // json.stringify -- arr to Json string
            if (writeErr) return res.status(500).json({ error: 'Error saving registration data' }) 
            return res.status(302).redirect('/?reg=true')
        })
    })
})


module.exports = router
