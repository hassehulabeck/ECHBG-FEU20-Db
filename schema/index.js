const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Product = require('./product')


// Lägg connection i en funktion för att köra asynkront
const connex = () => {
    return mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true });
}


const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {

    const hammare = new Product({
        name: "Hammare 5000",
        price: 200,
        category: "verktyg",
        weight: 3,
        inStock: true
    })

    console.log(hammare.priceTag())

    hammare.save((err, hammare) => {
        if (err) console.error(err)
        console.log(hammare)
    })

})

// En route som ger oss alla produkter
app.get('/', async(req, res) => {
    const products = await Product.find()
    res.json(products)
})

// En route som ger oss en produkt
app.get('/:productId', async(req, res) => {
    const product = await Product.findById(req.params.productId)
    res.json(product)
})



// Först anropar vi funktionen connex, sedan kör vi asynkront igång express-servern. 
// Vi skulle kunna vända på den proceduren, det spelar egentligen ingen praktisk roll. 
connex().then(async() => {
    app.listen(3000, () => {
        console.log("Nu igång på 3000")
    })
})