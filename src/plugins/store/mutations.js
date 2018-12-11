export default {
  switchDarkTheme (state, enabled) {
    state.darkTheme = enabled
  },
  login (state) {
    state.loggedIn = true
  },
  logout (state) {
    state.loggedIn = false
  }
}
