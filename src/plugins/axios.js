import Vue from 'vue'

// Lib imports
import axios from 'axios'

Vue.prototype.$http = axios

// const token = localStorage.getItem('token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['token'] = token
// }
