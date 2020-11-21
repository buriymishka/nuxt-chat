let AI = 0

export const state = () => ({
  alerts: []
})

export const getters = {
  alerts: state => state.alerts
}

export const mutations = {
  add(state, alert) {
    state.alerts.push(alert)
  },
  remove(state, id) {
    state.alerts = state.alerts.filter(el => el.id !== id)
  }
}

export const actions = {
  add({ commit }, { text = '', timeout = 4000, color = 'error' }) {
    commit('add', { text, color, id: ++AI, timeout })
  },

  remove({ commit }, id) {
    commit('remove', id)
  }

}
