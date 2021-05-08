const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes')

// Starta uppkopplingen
const client = mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'attendance' }, (err) => {
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

app.use('/', routes)


app.listen(3000, () => {
    console.log("Nu lyssnar vi")
})