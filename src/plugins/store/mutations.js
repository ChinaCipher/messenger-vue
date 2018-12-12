export default {
  switchDarkTheme (state, enabled) {
    state.darkTheme = enabled
  },
  login (state) {
    state.loggedIn = true
  },
  logout (state) {
    state.loggedIn = false
  },
  updateSelfData (state, data) {
    Object.keys(data).forEach(key => {
      state.selfData[key] = data[key]
    })
  },
  updateChattingData (state, data) {
    Object.keys(data).forEach(key => {
      state.chattingData[key] = data[key]
    })
  }
}
