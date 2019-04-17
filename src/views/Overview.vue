<template lang='pug'>
div
  .header-title
    h1 {{$store.state.user.user.company}} Overview
  el-main(v-if='!loading')
    div(v-if='locations.length == 0')
      el-row(span="24")
        .tip
          h2 Getting Started
          p Thank you for signing up! You're almost ready to start using our service, but before we need to know a little bit more about you.
          span You can start by
            add-location(cta='add your first location')
    el-row
      el-col
        add-location(cta='add a new location', v-if="$store.getters.has_role('admin')").add_more
    el-row
      .wrap
        .flexbox(v-for="location in locations")
          location-box(:location='location')
</template>

<script>
import addLocation from '@/components/locations/add'
import locationBox from '@/components/locations/box'
export default {
  components: {
    addLocation, locationBox
  },
  data () {
    return {
      loading: true
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchLocations')
    this.loading = false
  },
  computed: {
    locations () {
      return this.$store.state.locations
    }
  }
}
</script>

<style lang="scss" scoped>
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

  .add_more {
    margin-bottom: 20px;
    margin-right: 10px;
    display: block;
    float: right;
  }
  .header-title {
    margin: 0 2rem;
    h1 {
      text-align: center;
      margin: 1.8rem 0 0 0;
    }
  }
  .box {
    margin: 1rem 1rem 2rem 1rem;
    box-shadow: 0 4px 50px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.1);
  }

  .wrap {
    display:flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content:space-between;
    align-content:flex-start;
    padding: 0 -10px;
    .flexbox {
      padding: 0 10px;
      box-sizing: border-box;
      margin-bottom: 20px;
      flex-basis: 33%;
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
</style>
