const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    price: {
        type: Number,
        min: 0
    },
    specifications: Object,
    weight: Number,
    inStock: {
        required: true,
        type: Boolean
    }
})

productSchema.methods.priceTag = function() {
    return this.name + " kostar " + this.price + " kr."
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product