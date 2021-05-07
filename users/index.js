const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { update } = require('./models/user')
const User = require('./models/user')

// För att kunna ta emot post-requests och läsa req.body etc
app.use(express.urlencoded({ extended: true }))

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

    app.get('/:userid', async(req, res) => {

        // en variant isf _id
        // Ändra då parametern till username
        //const result = await User.findOne({ firstName: req.params.username })

        const result = await User.findById(req.params.userid)
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
            console.log(result)
                // För att testa våran metod.
            console.log(newUser.fullName())
            if (result !== null) {
                res.json(newUser)
            } else {
                res.send("Det blev problem med att spara i db.")
            }
        }
    })

    app.put('/:userid', async(req, res) => {

        // Loopa igenom req.body för att skapa ett objekt som innehåller de värden som ska ändras. 
        let updateObject = {}
        for (property in req.body) {
            updateObject[property] = req.body[property]
        }

        // findByAndUpdate behöver ett filter, ett objekt med ändringar och ev. ett options-objekt. 
        const result = await User.findByIdAndUpdate(
            req.params.userid,
            updateObject, { useFindAndModify: false })
        res.json(result)
    })

    app.delete('/:userid', async(req, res) => {
        const result = await User.deleteOne({ _id: req.params.userid })
        if (result.deletedCount == 1) {
            res.send("Användare " + req.params.userid + " är raderad.")
        } else {
            res.send("Problem uppstod.")
        }
    })

})


app.listen(3000, () => {
    console.log("Nu är jag lyssnade.")
    mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'webbsite' }, (err) => {
        if (err) console.error(err)
    })
})