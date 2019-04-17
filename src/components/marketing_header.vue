<template lang="pug">
  el-row(:class='variant')
    el-col(:span="12")
      img(src='../../public/bsl.png' style={width: '55%'})
    el-col(:span="12")
      el-menu.menu(:default-active='$route.path', :router="true", mode='horizontal')
        el-menu-item(index='/')
          span Home
        el-menu-item(index='/login')
          span Login
        el-menu-item(index='/signup')
          span Signup
</template>

<script>
export default {
  props: ['variant']
}
</script>

<style lang="scss" scoped>
  .el-menu.menu {
    float: right;
    background-color: initial;
    border-bottom: 0;
    .el-menu-item{
      margin-left: 20px;
      &:hover{
        background-color: initial;
      }
      span {
        text-decoration: none;
        text-transform: uppercase;
        font-weight: bold;
        font-family: "Roboto"
      }
    }
  }
  .white{
    .el-menu--horizontal{
      .el-menu-item {
        color: white;
        &.is-active{
          color: #f56c6c;
        }
        &:hover{
          color: white;
        }
      }
    }
  }
</style>
