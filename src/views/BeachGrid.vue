<template lang='pug'>
.sets-grid
  SetsGrid
</template>

<script>
import SetsGrid from '@/components/sets/SetsGrid.vue'
export default {
  components: {
    SetsGrid
  },
  name: 'BeachGrid'
}
</script>

<style lang="scss" scoped>
  .sets-grid {
    height: 100%;
  }
</style>
