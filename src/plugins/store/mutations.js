export default {
  setCode (state, code) {
    state.code = code
  },
  switchDarkTheme (state, enabled) {
    state.darkTheme = enabled
  },
  setUserInfo (state, info) {
    state.userInfo = info
  },
  setPrivateKey (state, key) {
    state.privateKey = key
  }
}
