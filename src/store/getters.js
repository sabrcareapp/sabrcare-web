// https://vuex.vuejs.org/en/getters.html

export default {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  authToken: state => state.token,
  authLevel: state => state.user.permissionLevel
}
