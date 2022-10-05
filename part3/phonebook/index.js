require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
app.use(express.json())
const morgan = require('morgan')
const cors = require('cors')
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(cors())
app.use(express.static('build'))
// fetching a singlec resource
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})
// create request
app.post('/api/persons', (req, res) => {
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
    })
})
// get all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.status(200).json(persons)
    })
})
app.get('/info', (req, res) => {
    res.send(`<div>phonebook has info of 2 people <p>${new Date()}</p></div>`)
})
// delete by id
app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(deletePerson => {
        res.status(204).end();
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
