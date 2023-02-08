
import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''
const setToken = (newToken) => {
  token = `Bearer ${newToken}`

}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}
const likePost = async (updatedObject) => {
  console.log('like post method in service ', updatedObject.id)
  const config = {
    headers: { Authorization: token },
  }
  console.log(`${baseUrl}/${updatedObject.id}`)
  const request = axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
  // console.log(`response data`,request.data);
  const response = await request
  return response.data
}
const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}


// export default { getAll, setToken, create }

const blogService = {
  getAll,
  create,
  likePost,
  setToken,
  deleteBlog
}
export default blogService