export default {
  switchDarkTheme ({ commit }, enabled) {
    commit('switchDarkTheme', enabled)
  },
  setUserInfo ({ commit }, info) {
    commit('setUserInfo', info)
  },
  setPrivateKey ({ commit }, key) {
    commit('setPrivateKey', key)
  },
  login ({ commit }) {
    commit('login')
  },
  logout ({ commit }) {
    commit('logout')
  }
}
