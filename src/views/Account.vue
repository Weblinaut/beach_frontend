<template lang='pug'>
.account-page
  h2 Account Overview
  div(v-if='locations.length === 0')
    h4 You currently have no locations set up.
    br
    el-button(type='success' @click='$router.push({name: "Locations"})') Create Location
  div(v-else)
    div(v-if='currentLocation')
      h4 Current Location
      div {{currentLocation.name}}
    div
      h4 Select Location
      el-select(v-model='selectedLocation', placeholder='Select Location')
        el-option(v-for='item in locations', :key='item.id', :label='item.name', :value='item.id')
      el-button(type='primary' @click='setCurrentLocation') Set Location
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Account',
  mounted () {
    this.$store.dispatch('fetchLocations')
  },
  data: () => ({
    selectedLocation: undefined
  }),
  methods: {
    setCurrentLocation () {
      this.$store.commit('setCurrentLocation', this.selectedLocation)
    }
  },
  computed: {
    ...mapState(['locations']),
    ...mapGetters(['currentLocation'])
  }
}
</script>

<style lang="scss" scoped>
  .header-title {
    margin: 0 2rem;
    h3 {
      text-align: center;
      margin: 1.8rem 0 0 0;
    }
  }
  .account-page, .sets-grid {
    height: 100%;
  }
</style>
