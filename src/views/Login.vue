<template lang='pug'>
.login-bg
  el-container
    el-main
      el-row
        el-col(:span="12", :offset="6")
          marketing-header(variant='white')
  .login-container
    .login-title
      h2 Sign In
    .login-content
      el-form(ref='form', label-width='120px')
        label Email:
        el-input(v-model='email' type='text')
        br
        br
        label Password:
        el-input(v-model='password' type='password')
        .login-sumbit
          | &nbsp;
          el-button.float-right(type='primary', @click='login') Submit
          router-link(:to="{ name: 'Signup'}").link No account? Signup
</template>

<script>
import MarketingHeader from '@/components/marketing_header'
export default {
  components: { MarketingHeader },
  name: 'Login',
  data () {
    return {
      email: this.$store.state.user.email,
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password })
        this.$router.push({ name: 'Overview' })
      } catch (e) {
        console.log(e)
        if (e.response.status === 404) {
          console.log('nope')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("../assets/bg.jpg") no-repeat center center fixed;
  background-size: cover;
}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-title,
.login-content {
  padding: 1rem 2rem;
  background: #08080899;
}

.login-title {
  text-align: center;
  h2 {
    font-family: "Roboto Slab", serif;
    display: inline-block;
    margin: 0 0 0.4rem 0;
    color: #fff;
  }
}

.login-content {
  label {
    color: #fff;
    margin-bottom: 0.6rem;
    display: inline-block;
  }
}

.float-right {
  float: right;
}

.login-sumbit {
  margin-top: 1.6rem;
  height: 3.2rem;
}
a.link{
  color: white;
}
</style>
