import axios from 'axios'
const instance = axios.create({
})

// Put all interceptors on this instance
instance.interceptors.request.use(r => {
  console.log('MAKING REQUEST')
  return r
})

export default instance
