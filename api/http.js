import { getAC, setAC } from '@/tokens/index'
import axios from 'axios'
import * as tokensAPI from './tokens'

const instance = axios.create({
  baseURL: 'https://mihail-nuxt-chat.herokuapp.com/api/',   // http://localhost:3000/api/
  withCredentials: true
})

instance.interceptors.request.use(addAccessToken);

instance.interceptors.request.use(request => {
  request.headers.access_token = getAC()
  return request
})

instance.interceptors.response.use(response => {
  return response.data
}, async (error) => {
  if(error.response.status === 401){
    let refresh = await instance.get('tokens/refresh')
    if(refresh.res && refresh.newAccessToken) {
      setAC(refresh.newAccessToken)
      return instance(addAccessToken(error.config));
    } else {
      window.$nuxt.$store.commit('user/setIsAuthenticated', false)
      window.$nuxt.$router.push('/')
    }
  }

  if(error.response.data.message) {
    error.message = error.response.data.message
  }
  throw error
})

export default instance

function addAccessToken(request){
	request.headers.access_token = getAC()
	
	return request;
}
