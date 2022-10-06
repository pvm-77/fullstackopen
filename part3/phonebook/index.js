require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
app.use(express.json())
const morgan = require('morgan')
const cors = require('cors')
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))
app.use(cors())
app.use(express.static('build'))

// fetching a singlec resource
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      // res.json(person)
      res.status(200).json(person)
    } else {
      res.status(404).json({ error: 'person not found' })
    }
  }).catch(e => next(e))
})
// create request
app.post('/api/persons', (req, res, next) => {
  if (req.body.name === '' || req.body.name === undefined) {
    return res.status(404).json({ error: 'name  is missing' })
  }
  if (req.body.number === '' || req.body.number === undefined) {
    return res.status(404).json({ error: ' number is missing' })
  }
  // person object to create new record
  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })
  person.save().then(savedPerson => {
    res.status(200).json(savedPerson)
  }).catch(error => next(error)

  )
})
// get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.status(200).json(persons)
  })
})
app.get('/info', (req, res) => {
  Person.find({}).count().then(count => {
    res.send(`<div>phonebook has info of ${count} people <p>${new Date()}</p></div>`)
  })

})
// delete by id
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  }).catch(e => next(e))
})
app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  }
  console.log(person)
  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.status(204).json(updatedPerson)
    }).catch(e => next(e))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
