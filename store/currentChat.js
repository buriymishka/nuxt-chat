import * as currentChatAPI from '@/api/currentChat'

export const state = () => ({
  users: [],
  messages: [],
  title: null,
  id: null
})

export const getters = {
  users: state => state.users,
  messages: state => state.messages,
  title: state => state.title,
  id: state => state.id
}

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  addUser(state, user) {
    state.users.push(user)
  },
  setMessages(state, messages) {
    state.messages = messages
  },
  addMessage(state, message) {
    state.messages.push(message)
  },
  setTitle(state, title) {
    state.title = title
  },
  setId(state, id) {
    state.id = id
  },
  clear(state) {
    state.messages = []
    state.users = []
    state.title = null
    state.id = null
  }
}

export const actions = {
  async loadChat({ commit, dispatch }, id) {
    dispatch('clear')
    try {
      let res = await currentChatAPI.loadChat(id)
      dispatch('setChat', res)
      return true
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },
  setChat({ commit }, chatInfo) {
    commit('setUsers', chatInfo.users)
    commit('setMessages', chatInfo.messages)
    commit('setTitle', chatInfo.title)
    commit('setId', chatInfo.id)
  },
  
  async sendMessage({ commit, dispatch }, message) {
    try {
      let res = await currentChatAPI.sendMessage(message)
      commit('addMessage', res)
      return res
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },
  clear({ commit }) {
    commit('clear')
  },

  socket_newMessage({ commit }, data) {
    commit('addMessage', {
      ownerId: data.ownerId,
      content: data.content,
    })
  },

  socket_addUserToCurrentChat({ commit }, data) {
    commit('addUser', {
      id: data.id,
      name: data.name,
    })
  }
  
}
