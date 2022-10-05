require('dotenv').config()
const express = require('express')
const app = express()
const Person=require('./models/person')
app.use(express.json())
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(cors())
app.use(express.static('build'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
// fetching a singlec resource
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find(anyperson => anyperson.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})


// create request
app.post('/api/persons', (req, res) => {
    const body=req.body
    console.log(body)
    if (req.body.name === '' || req.body.number === '') {
        return res.status(404).json({ error: 'name or number is missing' })
    }
    const personAlreadyExist = persons.find(person => person.name === req.body.name)
    // console.log(personAlreadyExist);
    if (personAlreadyExist !== undefined) {
        return res.status(404).json({ error: 'name already exist in phone book' })
    } else {
        // person object to create new record
        const person = {
            name: req.body.name,
            number: req.body.number,
            id: Math.floor(Math.random() * 100000) + 5
        }
        // console.log(person)
        // modify persons array 
        persons = persons.concat(person)
        res.status(200).json(person)
    }
})

// get all u
app.get('/api/persons', (request, response) => {

    console.log(persons)
    response.status(200).json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<div>phonebook has info of 2 people <p>${new Date()}</p></div>`)
})


app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    // const id = Number(req.params.id)
    const person = persons.filter(anyperson => anyperson.id !== id)
    res.status(204).end();
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})



