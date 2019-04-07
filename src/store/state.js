// https://vuex.vuejs.org/en/state.html

export default {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {
    permissionLevel: localStorage.getItem('permissionLevel') || '',
    email: localStorage.getItem('email') || ''
  }
}
