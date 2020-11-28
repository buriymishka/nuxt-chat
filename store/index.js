export const actions = {
  async nuxtServerInit ({ dispatch }, { req }) {
    await dispatch('user/autoLogin', req.cookies.refreshToken)
  },
}

