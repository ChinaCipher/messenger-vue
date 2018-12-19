export default {
  switchDarkTheme (state, enabled) {
    state.darkTheme = enabled
  },
  setUserInfo (state, info) {
    state.userInfo = info
  },
  setPrivateKey (state, key) {
    state.privateKey = key
  },
  login (state) {
    state.loggedIn = true
  },
  logout (state) {
    state.loggedIn = false
  }
}
