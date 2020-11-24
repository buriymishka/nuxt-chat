import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true
})

instance.interceptors.request.use(request => {
  console.log('MAKING REQUEST')
  request.headers.access_token = JSON.stringify({userId: '5fbb838acd32c53ed85227cb'})
  return request
})

instance.interceptors.response.use(response => {
  console.log('PARSING RESPONSE')
  return response.data
}, error => {
  if(error.response.data.message) {
    error.message = error.response.data.message
  }
  throw error
})

export default instance
