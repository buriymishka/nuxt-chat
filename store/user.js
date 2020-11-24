import * as userAPI from '@/api/user'

export const state = () => ({
  user: null,
})

export const getters = {
  user: state => state.user,
  userImage: state => {
    if (state.user) {
      return state.user.image || 'https://cdn.vuetifyjs.com/images/john.jpg'
    }
    return 'https://cdn.vuetifyjs.com/images/john.jpg'
  },
}

export const mutations = {
  set(state, user) {
    state.user = user
  },
  clear(state) {
    state.user = null
  }
}

export const actions = {
  async login({ commit, dispatch }, data) {
    try {
      let res = await userAPI.login(data)
      commit('set', res)
      this.$router.push('/cabinet')
      dispatch('alerts/add', { text: 'Successful sign in', color: 'green lighten-1' }, { root: true })
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async signUp({ commit, dispatch }, data) {
    try {
      let res = await userAPI.signUp(data)
      commit('set', res)
      this.$router.push('/cabinet')
      dispatch('alerts/add', { text: 'Successful registration', color: 'green lighten-1' }, { root: true })
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async recover({ dispatch }, data) {
    try {
      await userAPI.recover(data)
      dispatch('alerts/add', { text: 'Please, check your email', color: 'green lighten-1' }, { root: true })
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async logout({ commit, dispatch }) {
    try {
      await userAPI.logout()
      this.$router.push('/')
      commit('clear')
      dispatch('recentChats/clear', null, { root: true })
      dispatch('userChats/clear', null, { root: true })
      dispatch('currentChat/clear', null, { root: true })
      dispatch('alerts/add', { text: 'You are logged out', color: 'green lighten-1' }, { root: true })
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async load({ commit, dispatch }) {
    try {
      let res = await userAPI.load()
      commit('set', res)
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

  async update({ commit, dispatch }, data) {    
    try {
      let fd = new FormData()
      fd.append('name', data.name)
      fd.append('email', data.email)
      if (data.image) { fd.append('image', data.image, data.image.name) }
      fd.append('newPassword', data.newPassword)

      let res = await userAPI.update(fd)
      commit('set', res)
      dispatch('alerts/add', { text: 'Successful update', color: 'green lighten-1' }, { root: true })
      return true
    } catch (e) {
      dispatch('alerts/add', { text: e.message }, { root: true })
    }
  },

}
