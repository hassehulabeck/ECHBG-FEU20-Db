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
        validate: {
            validator: function(v) {
                return /^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/.test(v)
            },
            message: props => `${props.value} is not a valid ISBN number!`

        }
    }
})

/*
Även strängar kan ha min- och maxlängd. Ett ISBN-nummer består av 13 siffror, men kan också skrivas med bindesstreck emellan siffergrupperna, vilket i så fall genererar maximalt 17 tecken. Av den anledningen låter jag typen vara String.
*/

const Book = mongoose.model('Book', bookSchema)

module.exports = Book