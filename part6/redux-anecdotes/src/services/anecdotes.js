
import axios from 'axios'
const baseUrl = 'http://localhost:3005/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (updatedObject) => {
  // console.log('id in service ',id);
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  console.log('update response service',response.data);
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  createNew,
  update
}