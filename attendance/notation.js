const mongoose = require('mongoose')

const notationSchema = mongoose.Schema({
    person: String,
    time: Date,
    event: String
})

/*
Schemat här är bara ett förslag. Vi kan lagra samma information med detta:

    const notationSchema = mongoose.Schema({
        person: String,
        event: {
            checkInTime: Date,
            checkOutTime: Date
        }
    })

    eller med... 

    const notationSchema = mongoose.Schema({
        person: String,
        time: Date,
        event: {
            type: String,
            enum: ['KOM', 'GICK'],
            default: 'KOM'
        }
    })

    Då är event av typen String, men fungerar som ENUM, 
    dvs en typ som bara tillåter de förvalda värden vi definierat. Allt annat ger valideringsfel.

    Du väljer själv hur du vill att din data ska se ut, men tänk på att det ändå är användarens krav som styr vilka datatyper och -strukturer som är bäst. 

*/

const Notation = mongoose.model('Notation', notationSchema)

module.exports = Notation