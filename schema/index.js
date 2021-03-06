const mongoose = require('mongoose')

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

console.log(hammare)

console.log(hammare.priceTag())