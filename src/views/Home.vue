<template lang='pug'>
  el-row(type='flex').main_row
    el-col(:span="12").cta
      div
        h2 Use this SaaS app to streamline your Beach Service!
        h3 Tracking your seasonal reservations with charts is a thing of the past, Meet Beachset Link.
        router-link(:to='{name: "Signup"}')
          el-button(type="primary") Get Started
    el-col(:span="12")
      img.responsive(src='/hero_home.png')
</template>

<style lang='scss' scoped>
.main_row{
  margin-top: 20px;
  .cta{
    align-items: center;
    display: flex;
    h2 {
      font-family: 'Roboto Slab', serif;
      font-size: 40px;
    }
    h3 {
      font-family: 'Roboto', serif;
      font-size: 25px;
      font-weight: normal;
    }
    .el-button{
      font-family: 'Roboto', serif;
      font-size: 20px;
    }
  }
}
</style>
