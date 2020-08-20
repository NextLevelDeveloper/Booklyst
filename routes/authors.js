const express = require('express')
const router = express.Router()

//All authors route
router.get('/', (req, res)=>{
    res.render('authors/index')
})

//NEW authors route (form)
router.get('/new', (req, res)=>{
    res.render('authors/new')
})

//CREATE new author route
router.post('/', (req, res) => {
    res.send('Create')
})

module.exports = router