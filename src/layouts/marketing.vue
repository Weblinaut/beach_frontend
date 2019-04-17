<template lang="pug">
  el-container
    el-main
      el-row
        el-col(:span="12", :offset="6")
          MarketingHeader
          router-view
</template>

<script>
import MarketingHeader from '@/components/marketing_header'
export default {
  components: { MarketingHeader }
}
</script>

<style lang="scss" scoped>
  .el-container{
    min-height: 745px;
    background-image: url('/banner-bg.jpg');
  }
</style>
