const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const usersFile = path.join(__dirname, '/public/db/users.json')


const pages = ['index', 'about', 'hotels', 'resorts', 'experiences', 'contact', 'dashboard', 'login']
pages.forEach(page => {
    router.get(`/${page === 'index' ? '' : page}`, (req, res) => 
        res.render(page)
    )
})




router.post('/login', (req, res) => {
    const { username, password } = req.body
    fs.readFile(usersFile, 'utf-8', (err, data) => {
        if (err) return res.redirect('/login?error=server')

        let users = JSON.parse(data || '[]')
        const user = users.find(u => u.username === username && u.password === password)
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
        let users = JSON.parse(data || '[]')
        users.push({ username, password })

        fs.writeFile(usersFile, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) return res.status(500).json({ error: 'Error saving registration data' })
            return res.status(302).redirect('/?reg=true')
        })
    })
})


module.exports = router
