import * as chatsAPI from '@/api/userChats'

export const state = () => ({   // User chat
  chats: [],
  chatsLoaded: false,
  editChat: null,
})

export const getters = {
  chats: state => state.chats,
  chatsLoaded: state => state.chatsLoaded,
  editChat: state => state.editChat
}

export const mutations = {
  set(state, chats) {
    state.chats = chats
  },
  add(state, chat) {
    state.chats.push(chat)
  },
  remove(state, id) {
    state.chats = state.chats.filter(el => el.id !== id)
  },
  setChatsLoaded(state) {
    state.chatsLoaded = true
  },
  setEditChat(state, editChat) {
    state.editChat = editChat
  },
  update(state, chat) {
    let i = state.chats.findIndex(el => el.id === chat.id)
    state.chats[i] = chat
    state.editChat = chat
  },
  clearEditChat(state) {
    state.editChat = null
  },
  clear(state) {
    state.chats = []
    state.chatsLoaded = false
    state.editChat = null
  }
}

export const actions = {
  async load({ commit, dispatch }) {
    try {
      let res = await chatsAPI.getAll()
      commit('setChatsLoaded')
      commit('set', res)
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async loadById({ commit, dispatch }, id) {
    try {
      let res = await chatsAPI.loadById(id)
      commit('setEditChat', res)
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async create({ commit, dispatch }, data) {
    try {
      let chat = await chatsAPI.create(data)
      commit('add', chat)
      dispatch('alerts/add', { text: 'Chat has been successfully created', color: 'green lighten-1' }, { root: true })
      return true
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async update({ commit, dispatch }, data) {
    try {
      let chat = await chatsAPI.update(data)
      commit('update', chat)
      dispatch('alerts/add', { text: 'Chat has been successfully updated', color: 'green lighten-1' }, { root: true })
      return true
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    try {
      await chatsAPI.remove(id)
      commit('remove', id)
      dispatch('alerts/add', { text: 'Chat has been successfully deleted', color: 'green lighten-1' }, { root: true })
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async join({ dispatch }, data) {
    try {
      let chat = await chatsAPI.join(data)
      dispatch('alerts/add', { text: 'You have joined to chat', color: 'green lighten-1' }, { root: true })
      await dispatch('recentChats/add', chat.id, { root: true })
      this.$router.push(`/chat/${chat.id}`)
      return true
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
      return false
    }
  },

  clearEditChat({ commit }) {
    commit('clearEditChat')
  },

  clear({ commit }) {
    commit('clear')
  }

}
