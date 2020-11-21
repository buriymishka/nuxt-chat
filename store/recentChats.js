import * as recentChatsAPI from '@/api/recentChats'

export const state = () => ({
  recentChats: []
})

export const getters = {
  recentChats: state => state.recentChats
}

export const mutations = {
  set(state, recentChats) {
    state.recentChats = recentChats
  },

  add(state, recentChat) {
    state.recentChats.push(recentChat)
  },

  remove(state, id) {
    state.recentChats = state.recentChats.filter(el => el.id !== id)
  },
  
  clear(state) {
    state.recentChats = []
  }
}

export const actions = {
  async load({ commit, dispatch }) {
    try {
      let res = await recentChatsAPI.getAll()
      commit('set', res)
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async remove({ commit, dispatch }, id) {
    try {
      await recentChatsAPI.remove(id)
      commit('remove', id)
      dispatch('alerts/add', { text: 'Successful remove', color: 'green lighten-1' }, { root: true })
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async add({ commit, dispatch }, data) {
    try {
      let res = await recentChatsAPI.add(data)
      commit('add', res)
    } catch(e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  clear({ commit }) {
    commit('clear')
  }

}
