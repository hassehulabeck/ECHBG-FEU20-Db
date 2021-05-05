const express = require('express')
const app = express()
const router = require('./routes')

app.use(router)


app.listen(3030, () => {
    console.log('Lyssnar nu på 3030')
})