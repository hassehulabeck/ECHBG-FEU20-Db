const express = require('express')
const app = express()
const mongoose = require('mongoose')

const User = require('./models/user')

// När uppkoppling är gjord - några eventhandlers som agerar då.
const db = mongoose.connection

db.on('error', (err) => {
    console.error(err)
})

db.once('open', () => {
    // Här kan vi göra grejer, exempelvis lyssna på requests.

    app.get('/', async(req, res) => {
        const result = await User.find({})
        res.json(result)
    })

    app.post('/', async(req, res) => {
        if (req.body.firstName !== null) {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthday: req.body.birthday
            })
            const result = await newUser.save()
            if (result.insertedCount == 1) {
                res.json(newUser)
            } else {
                res.send("Det blev problem med att spara i db.")
            }
        }
    })

})


app.listen(3000, () => {
    console.log("Nu är jag lyssnade.")
    mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) console.error(err)
    })
})