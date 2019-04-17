import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(VueMoment, {
  moment
})
Vue.config.productionTip = false

if (window.localStorage.getItem('user_token')) {
  store.commit('setUser', window.localStorage.getItem('user_token'))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
