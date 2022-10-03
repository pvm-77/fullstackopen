import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
const create = newObject => axios.post(baseUrl, newObject)
const deletePerson = id => axios.delete(`${baseUrl}/${id}`)
const update = (id, updatedObject) => axios.put(`${baseUrl}/${id}`, updatedObject)
const person = {
    create: create,
    deletePerson: deletePerson,
    update: update
}
export default person