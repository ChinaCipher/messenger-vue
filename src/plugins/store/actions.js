export default {
  switchDarkTheme ({ commit }, enabled) {
    commit('switchDarkTheme', enabled)
  },
  login ({ commit }) {
    commit('login')
  },
  logout ({ commit }) {
    commit('logout')
  },
  updateSelfData ({ commit }, data) {
    commit('updateSelfData', data)
  },
  updateChattingData ({ commit }, data) {
    commit('updateChattingData', data)
  }
}
