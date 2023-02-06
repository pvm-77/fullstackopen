import axios from 'axios'
const baseUrl = 'http://localhost:3005/anecdotes'
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdoteObject = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const update = async (updatedObject) => {

  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)

  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  createNew,
  update
}