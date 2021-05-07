const Product = require('./models/product')

const samsung12 = new Product({
    name: 'Samsung 12 X',
    price: 11000,
    specifications: {
        typ: 'Seniormobil',
        color: 'blue'
    },
    weight: 320
})

console.log(samsung12.specifications.color)

console.log(samsung12.priceTag())