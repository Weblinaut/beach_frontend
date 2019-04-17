<template lang='pug'>
div
  ChartHeader
  el-main
    ChartTable
</template>

<script>
import ChartTable from '@/components/ChartTable.vue'
import ChartHeader from '@/components/ChartHeader.vue'

export default {
  components: {
    ChartTable,
    ChartHeader
  },
  name: 'BeachList'
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
</style>
