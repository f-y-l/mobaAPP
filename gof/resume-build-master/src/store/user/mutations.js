export default {
  toggleLogin(state) {
    state.isLogin = !state.isLogin
  },
  changeState(state,payload) {
    delete payload.type
    for (var item in payload) {
      state[item] = payload[item]
    }
  },
  resetState(state) {
    state.email = ''
    state.isAdmin = false
    state.isVip = false
    state.name = ''
    state._id = ''
    state.isLogin = false
  },
  isvip(state) {
    state.isVip = true
  },
  islogin(state) {
    state.isLogin = true
  }
}
