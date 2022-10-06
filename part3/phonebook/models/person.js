const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
// console.log(`connecting to ${url}`);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(error => {
    console.log('error connecting to mongodb', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function (myNumber) {
        return /^\d{2,3}-\d{5,}$/.test(myNumber)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true,
    minLength:8
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)