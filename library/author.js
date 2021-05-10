const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = Schema({
    name: String,
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author