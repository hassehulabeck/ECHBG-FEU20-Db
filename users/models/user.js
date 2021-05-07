const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    birthday: Date,
})

// Om vi behöver någon metod, så kan vi göra den här

userSchema.methods.fullName = function() {
    return this.firstName + " " + this.lastName
}

const User = mongoose.model('User', userSchema)

module.exports = User