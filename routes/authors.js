const express = require('express')
const Author = require('../models/author')
const router = express.Router()

//All authors route
router.get('/', (req, res)=>{
    res.render('authors/index')
})

//NEW authors route (form)
router.get('/new', (req, res)=>{
    res.render('authors/new', { author: new Author() })
})

//CREATE new author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    

    try {
        const newAuthor = await author.save()
        res.redirect('authors/${newAuthor.id}')
        res.redirect('authors')
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }

})

module.exports = router