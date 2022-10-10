const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    author: {
        type: String,
        default: 'anonymous'
    },
    likes: {
        type: Number,
        default: 0
    },
    url: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})


//format the objects returned by Mongoose
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)