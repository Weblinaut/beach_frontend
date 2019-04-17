<template lang='pug'>
.chart-container
  .edit-form
    el-dialog(title='Edit Reservation', :visible.sync='editVisible')
      el-form(:model='form')
        el-form-item(label='Name', :label-width='formLabelWidth')
          el-input(v-model='form.name', autocomplete='off')
        el-form-item(label='Room', :label-width='formLabelWidth')
          el-input(v-model='form.room')
        el-form-item(label='Description', :label-width='formLabelWidth')
          el-input(v-model='form.description')
        el-form-item(label='Begin Date', :label-width='formLabelWidth')
          el-date-picker(v-model='form.beginDate', type='date', format='MM/dd/yyyy', value-format='timestamp', placeholder='Pick a day')
        el-form-item(label='End Date', :label-width='formLabelWidth')
          el-date-picker(v-model='form.endDate', type='date', format='MM/dd/yyyy', value-format='timestamp', placeholder='Pick a day')
        el-form-item(label='Charge', :label-width='formLabelWidth')
          el-checkbox(v-model='form.charge')
        el-form-item(label='Cash', :label-width='formLabelWidth')
          el-checkbox(v-model='form.cash')
          el-form-item(v-if='form.cash', label='Cash Amount')
            el-input(v-model='form.cashAmount', class='input-cash')
      span.dialog-footer(slot='footer')
        el-button(@click='editVisible = false') Cancel
        el-button(type='primary', @click='save') Confirm

  .box
    .table-options
      el-button(@click='add("east")') Add set to East
    .table-options
      el-button(@click='add("west")') Add set to West
  .box
    .sets-chart
      el-table(:data='tableData.east', :default-sort = "{prop: 'set', order: 'descending'}")
        el-table-column(prop='set', label='Set' width='60')
        el-table-column(prop='name', label='Name')
        el-table-column(prop='room', label='Room' width='80')
        el-table-column(prop='description', label='Description')
        el-table-column(prop='beginDate', label='Begin Date', :formatter='DateFormat')
        el-table-column(prop='endDate', label='End Date', :formatter='DateFormat')
        el-table-column(prop='charge' label='Charge' width='80')
          template(slot-scope='props')
            i(:class='{"el-icon-check": props.row.charge}')
        el-table-column(prop='cash', label='Cash' width='80')
          template(slot-scope='props')
            i(:class='{"el-icon-check": props.row.cash}')
            span(v-if='props.row.cash && props.row.cashAmount') &nbsp; ${{props.row.cashAmount}}
        el-table-column(label='Operations')
          template(slot-scope='scope')
            a.table-action(href='#' @click='edit("east", scope.row)')
              i.el-icon-edit-outline
            a.table-action(href='#' @click='remove("east", scope.row)')
              i.el-icon-delete

  .box
    .sets-chart
      el-table(:data='tableData.west')
        el-table-column(prop='set', label='Set' width='60')
        el-table-column(prop='name', label='Name')
        el-table-column(prop='room', label='Room' width='80')
        el-table-column(prop='description', label='Description')
        el-table-column(prop='beginDate', label='Begin Date', :formatter='DateFormat')
        el-table-column(prop='endDate', label='End Date', :formatter='DateFormat')
        el-table-column(prop='charge' label='Charge' width='80')
          template(slot-scope='props')
            i(:class='{"el-icon-check": props.row.charge}')
        el-table-column(prop='cash', label='Cash' width='80')
          template(slot-scope='props')
            i(:class='{"el-icon-check": props.row.cash}')
            span(v-if='props.row.cash && props.row.cashAmount') &nbsp; ${{props.row.cashAmount}}
        el-table-column(label='Operations')
          template(slot-scope='scope')
            a.table-action(href='#' @click='edit("west", scope.row)')
              i.el-icon-edit-outline
            a.table-action(href='#' @click='remove("west", scope.row)')
              i.el-icon-delete

</template>

<script>
import Vue from 'vue'
import tableData from './tableDataFixtures'
export default Vue.extend({
  name: 'ChartTable',
  data () {
    return {
      sections: ['East', 'West'],
      tableData: tableData,
      editVisible: false,
      form: {},
      editIndex: 0,
      formLabelWidth: '120px',
      editSection: null
    }
  },
  methods: {
    edit (section, row) {
      this.form = this.clone(row)
      this.editIndex = this.tableData[section].findIndex((x) => x.set === row.set) || this.tableData[section].length
      this.editVisible = true
      this.editSection = section
    },
    remove (section, row) {
      let msg = 'Are you sure you want to remove this Set?'
      if (window.confirm(msg)) {
        let index = this.tableData[section].findIndex((x) => x.set === row.set)
        this.tableData[section].splice(index, 1)
      }
    },
    add (section) {
      let data = {
        set: this.tableData[section].length + 1,
        name: '',
        room: null,
        description: '',
        beginDate: Date.now(),
        endDate: Date.now(),
        charge: false,
        cash: false,
        cashAmount: 0
      }
      this.edit(section, data)
    },
    save () {
      // this.tableData[section] = editSection
      let formData = this.clone(this.form)
      this.tableData[this.editSection].splice(this.editIndex, 1, formData)
      this.editVisible = false
      this.form = {}
      this.editSection = null
    },
    clone (obj) {
      // this is where immutability would come in handy
      return JSON.parse(JSON.stringify(obj))
    },
    DateFormat (row, col) {
      let date = new Date(row[col.property])
      return date.toLocaleDateString('en-US')
    }
  }
})
</script>
<style lang="scss" scoped>
  .table-action {
    margin: 0 0.8rem;
    display: inline-block;
  }
  .table-options {
    border-bottom: 1px solid #f1f1f1;
    padding: 1rem;
    background: #f7f8fd;
  }
  // .box {
  //   margin: 1rem 1rem 2rem 1rem;
  //   box-shadow: 0 4px 50px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.1);
  // }
</style>
<style>
  /* .box {
    margin: 1rem 1rem 2rem 1rem;
    box-shadow: 0 4px 50px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.1);
  }*/
  .el-table .cell {
    word-break: unset !important;
  }
  .input-cash.el-input {
    width: 6rem;
  }
  .sets-chart {
    padding: .8rem;
    background: rgb(251, 251, 251);
  }
</style>
