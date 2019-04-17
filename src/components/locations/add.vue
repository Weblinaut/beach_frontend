<template lang="pug">
  span.container
    el-button(@click='add', type='primary', icon='el-icon-plus') {{ cta }}
    location-form(v-bind:visible.sync='editVisible', :form="form", :submitMethod="save")
</template>

<script>
import LocationForm from './form'
export default {
  components: { LocationForm },
  props: ['cta'],
  data () {
    return {
      saving: false,
      editVisible: false,
      formLabelWidth: '120px',
      form: {
        settings: {
          sections: [{
            name: 'Front Row',
            chair_count: 15
          }]
        }
      }
    }
  },
  methods: {
    add () {
      this.editVisible = true
    },
    async save (payload) {
      await this.$store.dispatch('getWeather', payload)
      await this.$store.dispatch('createLocation', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
  span.container{
    margin-left: 10px;
  }
</style>
