// https://vuex.vuejs.org/en/mutations.html

export default {
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state, token, user) {
    state.status = 'success'
    state.token = token
    // state.user = {
    //   permissionLevel: user.permissionLevel,
    //   email: user.email
    // }
  },
  auth_error (state) {
    state.status = 'error'
  },
  logout (state) {
    state.status = ''
    state.token = ''
  }
}
