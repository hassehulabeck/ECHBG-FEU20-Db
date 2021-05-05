const mongoose = require('mongoose')
const express = require('express')
const app = express()
const url = 'mongodb://localhost:27017/zoo';

// För att kunna läsa post-requests på ett enkelt sätt.
app.use(express.urlencoded({ extended: true }))

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    const animalSchema = new mongoose.Schema({
        name: String,
        art: String,
        birthdate: Date,
        avdelning: String,
        category: String
    })

    const Animal = mongoose.model('Animal', animalSchema)

    app.get('/', (req, res) => {
        Animal.find({}, (err, animals) => {
            if (err) res.send("Error: " + err)
            res.json(animals)
        })
    })


    app.post('/', (req, res) => {
        if (req.body.name != null) {
            let newAnimal = new Animal({
                name: req.body.name,
                art: req.body.art,
                birthdate: req.body.birthdate,
                avdelning: req.body.avdelning,
                category: req.body.category
            })
            newAnimal.save((err, newAnimal) => {
                if (err) res.send("Fel i skapandet av djuret")
                res.send("Det verkar ha gått bra för " + newAnimal.name)
            })
        }
    })
})

app.listen(3000, () => {
    console.log('Vi är igång på 3000')
})