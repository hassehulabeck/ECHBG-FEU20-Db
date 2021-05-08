const mongoose = require('mongoose')

const notationSchema = mongoose.Schema({
    person: String,
    time: Date,
    event: String
})

const Notation = mongoose.model('Notation', notationSchema)

module.exports = Notation