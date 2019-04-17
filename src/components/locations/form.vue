<template lang="pug">
el-dialog(title='Add a new location', :visible.sync='visible', :before-close='handleClose')
  el-form(:model='form')
    el-form-item(label='Name', :label-width='formLabelWidth')
      el-input(v-model='form.name', autocomplete='off')
    el-form-item(label='Address', :label-width='formLabelWidth')
      el-input(v-model='form.street')
    el-form-item(label='City', :label-width='formLabelWidth')
      el-input(v-model='form.city')
    el-form-item(label='Zip code', :label-width='formLabelWidth')
      el-input(v-model='form.zipcode')
    h4 Default Sections
    div(v-if='form.settings.sections.length > 0')
      el-row(v-for='(section, idx) in form.settings.sections').sections
        el-col(:span="11")
          el-input(v-model='form.settings.sections[idx].name')
        el-col(:span="11", :offset="1")
          el-input-number(v-model='form.settings.sections[idx].chair_count')
          a.section_action(title='remove this section', @click='removeSection(idx)')
            el-button(icon="el-icon-minus", circle='',  size='mini')
          a.section_action(title='add a section', @click='addSection')
            el-button(icon="el-icon-plus", circle='', type='primary',  size='mini', v-if='idx == (form.settings.sections.length - 1)')
    el-row(v-else='')
      a.section_action(title='add a section', @click='addSection')
        el-button(icon="el-icon-plus", type='primary') Add a section
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
    async submit () {
      this.saving = true
      try {
        await this.submitMethod(this.form)
        this.$emit('update:visible', false)
      } catch (e) {
        console.log(e)
      }
      this.saving = false
    },
    handleClose () {
      this.$emit('update:visible', false)
    },
    removeSection (idx) {
      this.form.settings.sections.splice(idx, 1)
    },
    addSection () {
      this.form.settings.sections.push({ chair_count: 10 })
    }
  }
}
</script>

<style lang="scss" scoped>
.sections{
  margin-bottom: 10px;
  .section_action {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>
