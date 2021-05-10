const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Author = require('./author')
const Book = require('./book')

// Starta uppkopplingen
const client = mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'library' }, (err) => {
    if (err) console.error(err)
})

// För att kunna ta emot post-requests och läsa req.body etc
app.use(express.urlencoded({ extended: true }))

// När uppkoppling är gjord - några eventhandlers som agerar då.
const db = mongoose.connection

db.on('error', (err) => {
    console.error(err)
})
db.once('open', () => {
    console.log("Nu har vi kontakt med databasen")
})

// Routes
app.post('/', (req, res) => {
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    })

    author.save((err) => {
        if (err) console.error(err)

        const book = new Book({
            title: req.body.title,
            author: author._id
        })

        book.save((err) => {
            if (err) console.error(err)

            res.send("Boken är sparad")
        })
    })
})

// Hämta alla böcker
app.get('/', (req, res) => {
    Book.find({}).populate('author').exec(function(err, books) {
        if (err) console.error(err)

        res.json(books)

    })
})


app.listen(3000, () => {
    console.log('Nu igång på 3000')
})