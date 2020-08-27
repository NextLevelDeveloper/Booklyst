const express = require('express')
const Author = require('../models/author')
const router = express.Router()

//All authors route
router.get('/', async (req, res)=>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', 
        {
            authors: authors,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }
    
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
        // res.redirect('authors/${newAuthor.id}')
        res.redirect('authors')
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }

})

//show
router.get('/:id', (req, res) => {
    res.send('Show Author ' + req.params.id)
})

//edit
router.get('/:id/edit', (req, res) => {
    res.send('Edit Author ' + req.params.id)
})

//update
router.put('/:id', (req, res) => {
    res.send('Update Author ' + req.params.id)
})

//delete
router.delete('/:id', (req, res) => {
    res.send('Delete Author ' + req.params.id)
})

module.exports = router