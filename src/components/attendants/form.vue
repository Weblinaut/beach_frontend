<template lang="pug">
el-dialog(title='Add a new location', :visible.sync='visible', :before-close='handleClose')
  el-form(:model='form')
    el-form-item(label='First Name', :label-width='formLabelWidth')
      el-input(v-model='form.firstname', autocomplete='off')
    el-form-item(label='Last Name', :label-width='formLabelWidth')
      el-input(v-model='form.lastname', autocomplete='off')
    el-form-item(label='Email', :label-width='formLabelWidth')
      el-input(v-model='form.email', autocomplete='off')
    el-form-item(label='Password', :label-width='formLabelWidth')
      el-input(v-model='form.password', autocomplete='off')
    el-form-item(label='Confirm Password', :label-width='formLabelWidth')
      el-input(v-model='form.password_confirmation', autocomplete='off')
    el-upload.upload-demo(drag='', ref='upload', action='', :auto-upload='false', :multiple="false", :limit="1", :thumbnail-mode="true", list-type="picture")
      i.el-icon-upload
      .el-upload__text
        | Drop file here or
        em click to upload
      .el-upload__tip(slot='tip') jpg/png files with a size less than 500kb

  span.dialog-footer(slot='footer')
    el-button(@click="$emit('update:visible', false)") Cancel
    el-button(type='primary', @click='submit', :loading="saving", :disabled="saving") Confirm
</template>

<script>
export default {
  props: ['form', 'submitMethod', 'visible'],
  data () {
    return {
      formLabelWidth: '160',
      saving: false
    }
  },
  methods: {
    handleClose () {
      this.$refs.upload.clearFiles()
      this.$emit('update:visible', false)
    },
    async submit () {
      this.saving = true
      try {
        if (this.$refs.upload.uploadFiles.length > 0) { this.form.avatar = this.$refs.upload.uploadFiles[0].raw }
        await this.submitMethod(this.form)
        this.$refs.upload.clearFiles()
        this.$emit('update:visible', false)
      } catch (e) {
        console.log(e)
      }
      this.saving = false
    }
  }
}
</script>
