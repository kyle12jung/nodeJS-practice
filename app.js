const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog');

const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://kyle12jung:hw100954@nodepractice.njniomj.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
    // register view engine
app.set('view engine', 'ejs')


// middleware and static fules
app.use(express.static('public'))
app.use(morgan('dev'))

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        }).catch((err) => console.log(err))
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
})

app.get('/single-blog', (req, res) => {
    Blog.findById('636ee605e4e5e2a5a2adc262')
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
})


app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => console.log(err))
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' })
})

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})