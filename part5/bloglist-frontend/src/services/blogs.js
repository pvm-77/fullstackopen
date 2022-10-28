import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''
const setToken = (newToken) => {
  token = `Bearer ${newToken}`

}

const create = async (newObject) => {
  console.log(`in service ${newObject}`);
  console.log(newObject)
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}
const likePost = (updatedObject) => {
  console.log(updatedObject.id)
  const config = {
    headers: { Authorization: token },
  }
  console.log(`${baseUrl}/${updatedObject.id}`);
  const request = axios.post(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
  return request.then(response => response.data)
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
// export default { getAll, setToken, create }

const blogService = {
  getAll,
  create,
  likePost,
  setToken
}
export default blogService