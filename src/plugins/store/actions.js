export default {
  switchDarkTheme ({ commit }, enabled) {
    commit('switchDarkTheme', enabled)
  },
  setUserInfo ({ commit }, info) {
    commit('setUserInfo', info)
  },
  login ({ commit }) {
    commit('login')
  },
  logout ({ commit }) {
    commit('logout')
  }
}
