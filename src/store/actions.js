// https://vuex.vuejs.org/en/actions.html
import axios from 'axios'
export default {
  login ({ commit }, user) {
    const userEmail = user.email
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: 'http://api.remedley.com/api/admin/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = {
            permissionLevel: resp.data.permissionLevel,
            email: userEmail
          }
          localStorage.setItem('token', token)
          localStorage.setItem('permissionLevel', user.permissionLevel)
          localStorage.setItem('email', user.email)
          // axios.defaults.headers.common['token'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          localStorage.removeItem('permissionLevel')
          localStorage.removeItem('email')
          reject(err)
        })
    })
  },
  signup ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: 'http://api.remedley.com/api/admin/signup', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          // axios.defaults.headers.common['token'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      // delete axios.defaults.headers.common['token']
      resolve()
    })
  }
}
