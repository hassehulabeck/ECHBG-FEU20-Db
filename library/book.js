const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = Schema({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    isbn: {
        type: String,
        minLength: 13,
        maxLength: 17
    }
})

/*
Även strängar kan ha min- och maxlängd. Ett ISBN-nummer består av 13 siffror, men kan också skrivas med bindesstreck emellan siffergrupperna, vilket i så fall genererar maximalt 17 tecken. Av den anledningen låter jag typen vara String.
*/

const Book = mongoose.model('Book', bookSchema)

module.exports = Book