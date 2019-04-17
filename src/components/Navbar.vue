<template lang="pug">
el-menu.el-menu-demo(:default-active='activeLink', :router='true' mode='horizontal', background-color='rgba(0, 12, 32, 0.7)', text-color='#fff', active-text-color='#ffd04b')
  el-menu-item(index='/') Home
  el-menu-item(index='/account', v-if='session.user') Account
  el-menu-item(index='/login', v-if='!session.user') Login
  el-menu-item(index='/signup', v-if='!session.user') Signup
  el-menu-item(index='/logout', v-if='session.user', @click='logout') Logout
  .right Sun Sand and Sea Beach Service
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'NavBar',
  data () {
    return {
      activeLink: '/'
    }
  },
  mounted () {
    this.activeLink = this.$route.path
  },
  watch: {
    $route (newVal, oldVal) {
      this.activeLink = newVal.path
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {
    ...mapState({
      session: 'user'
    })
  }
}
</script>

<style scoped>
.el-menu {
  z-index: 1000;
}
.el-menu-item {
  background-color: transparent !important;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.right {
  float: right;
  line-height: 3.6;
  padding-right: 2rem;
  font-family: 'Roboto', serif;
  color: rgb(228, 246, 255);
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 1px;
}
</style>
