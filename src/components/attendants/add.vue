<template lang="pug">
  el-row
    .box
      .table-options
        el-button(@click='add') Add Attendant
    attendant-form(v-bind:visible.sync='editVisible', :form="{}", :submitMethod="save")
</template>

<script>
import attendantForm from './form'
export default {
  components: { attendantForm },
  data () {
    return {
      saving: false,
      editVisible: false,
      formLabelWidth: '120px',
      form: {}
    }
  },
  methods: {
    add () {
      this.editVisible = true
    },
    async save (payload) {
      await this.$store.dispatch('createAttendant', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-options {
    border-bottom: 1px solid #f1f1f1;
    padding: 1rem;
    background: #f7f8fd;
  }
  .box {
    margin: 1rem 1rem 2rem 1rem;
    box-shadow: 0 4px 50px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.1);
  }
</style>
