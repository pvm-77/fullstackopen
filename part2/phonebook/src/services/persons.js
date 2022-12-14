import axios from 'axios'
const baseUrl = '/api/persons'
const getAll=()=>axios.get(baseUrl)
const create = newObject => axios.post(baseUrl, newObject)
const deletePerson = id => axios.delete(`${baseUrl}/${id}`)
const update = (id, updatedObject) => axios.put(`${baseUrl}/${id}`, updatedObject)
const person = {
    getAll:getAll,
    create: create,
    deletePerson: deletePerson,
    update: update
}
export default person