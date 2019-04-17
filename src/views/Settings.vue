<template lang='pug'>
div
  .header-title
    h1 Account Settings
  el-main
    el-row
      el-col(:span="14")
        el-form
          el-form-item(label="Account Name")
            el-input(:value="$store.state.user.user.company")
          el-form-item(label="Email")
            el-input(:value="$store.state.user.user.email")
          el-form-item
            el-button(type="primary") Save
      el-col(:span="9", :offset="1")
        .tip
          h2 Do you need help?
          span If you ever need help setting up your account, please don't drop us a line at noreply@beachset.link
</template>

<script>

export default {
  name: 'Settings'
}
</script>

<style lang="scss" scoped>
  .header-title {
    margin: 0 2rem;
    h1 {
      text-align: center;
      margin: 1.8rem 0 0 0;
    }
  }
  .tip{
    padding: 8px 16px 16px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
    font-family: 'Roboto Slab', serif;
    .el-button {
      margin-left: 10px;
    }
    h2 {
      margin-top: 10px;
    }
  }
</style>
