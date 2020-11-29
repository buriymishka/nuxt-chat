import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io-extended'

export default ({ store }) => {
  Vue.use(VueSocketIO, io('http://localhost:3000'),   //  https://mihail-nuxt-chat.herokuapp.com/
    {
      store,
      debug: false,
      actionPrefix: 'socket_',
      mutationPrefix: 'SOCKET_'
    })
}
