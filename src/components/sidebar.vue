
<template lang="pug">
  el-aside(width='auto')
    ul
      li(v-for='link in links', :class="{active: $route.name == link.name}")
        router-link(:to='{name: link.name}', v-if='!link.role || $store.getters.has_role(link.role)')
          a(:title="link.tooltip")
            i.material-icons.md-36 {{link.icon}}
    ul.bottom
      li
        a(@click='logout', title='Logout')
          i.material-icons.md-36 power_settings_new
</template>

<script>
import links from './sidebar_links'
export default {
  data () {
    return {
      links: links
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside{
  border-right: 1px solid#e6d9d9;
  ul {
    overflow: none;
    list-style: none;
    padding: 0;
    li {
      margin: 20px 0px;
      padding: 10px 10px;
      &.active{
        a{
          color: #4a5a6b;
        }
      }
      &:hover{
        background-color: #ecf5ff;
      }
      a {
        color: #909399;
        i {
          font-size: 36px;
          transition: font-size .5s;
        }
      }
    }
  }
  ul.bottom{
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
    li {
      margin-bottom: 0;
    }
  }
}
</style>
