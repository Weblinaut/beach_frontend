import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Marketing from './layouts/marketing.vue'
import Main from './layouts/main.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import BeachList from './views/BeachList.vue'
import BeachGrid from './views/BeachGrid.vue'
import Users from './views/Users.vue'
import Overview from './views/Overview.vue'
import Reporting from './views/Reporting.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '',
      component: Marketing,
      children: [{
        path: '',
        name: 'Home',
        component: Home
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/account',
      component: Main,
      children: [{
        path: '',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'beach_list',
        name: 'BeachList',
        component: BeachList
      },
      {
        path: 'beach_grid',
        name: 'BeachGrid',
        component: BeachGrid
      },
      {
        path: 'users',
        name: 'Users',
        component: Users
      },
      {
        path: 'reporting',
        name: 'Reporting',
        component: Reporting
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings
      }]
    }
  ]
})
