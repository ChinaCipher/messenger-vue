export default {
  setCode ({ commit }, code) {
    commit('setCode', code)
  },
  switchDarkTheme ({ commit }, enabled) {
    commit('switchDarkTheme', enabled)
  },
  setUserInfo ({ commit }, info) {
    commit('setUserInfo', info)
  },
  setPrivateKey ({ commit }, key) {
    commit('setPrivateKey', key)
  },
  logout ({ commit }) {
    commit('setUserInfo', undefined)
    commit('setPrivateKey', undefined)
  }
}
