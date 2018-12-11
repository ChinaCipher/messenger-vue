export default {
  switchDarkTheme ({ commit }, enabled) {
    commit('switchDarkTheme', enabled)
  },
  login ({ commit }) {
    commit('login')
  },
  logout ({ commit }) {
    commit('logout')
  }
}
