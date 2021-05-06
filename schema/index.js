const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {

    const productSchema = new mongoose.Schema({
        name: String,
        price: Number,
        category: String,
        weight: Number,
        inStock: Boolean
    })

    // Observera att du INTE kan använda en arrow function, eftersom this då pekar någon annanstans. 
    productSchema.methods.priceTag = function() {
        return this.name + " kostar " + this.price + "kr."
    }

    const Product = mongoose.model('Product', productSchema)

    const hammare = new Product({
        name: "Hammare 2000",
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