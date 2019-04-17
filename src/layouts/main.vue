<template lang="pug">
  el-container
    Sidebar
    el-main
      router-view
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/sidebar'
export default {
  components: { Navbar, Sidebar }
}
</script>

<style lang='scss' scoped>
body {
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
h1 {
  font-family: 'Roboto Slab', serif;
  color: #7990a8;
}
.center {
  text-align: center;
}
.el-container{
  min-height: 100vh;
}
</style>
