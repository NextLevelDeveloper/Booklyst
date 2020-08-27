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
        res.redirect(`authors/${newAuthor.id}`)
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
router.get('/:id/edit', async (req, res) => {
    try{
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author })
    }catch{
        res.redirect('/authors')
    }
    
})

//update
router.put('/:id', async (req, res) => {
    let author 
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch (error) {
        if(author == null){
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating Author'
            })
        }
    }
})

//delete
router.delete('/:id', async (req, res) => {
    let author 
    try {
        author = await Author.findById(req.params.id)
        await author.remove()
        res.redirect('/authors')
    } catch (error) {
        if(author == null){
            res.redirect('/')
        } else {
            res.redirect(`/authors/${author.id}`)
        }
    }
})

module.exports = router