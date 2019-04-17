<template lang='pug'>
.header-title
  .box
    h3 {{this.currentDayString}}

</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'ChartHeader',
  data () {
    return {
      currentDayString: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>

</style>
