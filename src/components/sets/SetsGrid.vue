<template lang="pug">
.sets-bg
  .grid-actions
    el-form(:inline="true")
      el-form-item(label='Add a Section')
        el-input(v-model='sectionName' placeholder='Name of the section')
      el-form-item
        el-button(type="primary" @click="addSection()") create

  .grid-sections
    div(v-for='section in sections')
      .grid-section
        .grid-section-title {{section.name}}
        a.section-edit(@click.prevent='editSection(section)')
          i.el-icon-edit
        a.section-trash(@click.prevent='removeSection(section)')
          i.el-icon-delete
        el-button-group.section-rental-actions
          el-button(@click='decrementRental(section)' icon='el-icon-minus' size="mini")
          el-button(@click='incrementRental(section)' icon='el-icon-plus' size="mini")
      br
      .set(v-for='rental in section.rentals' @click='editRental(rental)' :class='{occupied: rental.reservation}') {{rental.number}}

  .edit-form(note='//this edit rental form should be extracted to its own component and shared with ChartTable')
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
        el-button(type='primary', @click='saveRental') Confirm
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SetsGrid',
  async mounted () {
    // this.siteId = await this.$store.dispatch('fetchCurrentLocationId')
    await this.$store.dispatch('fetchLocations')
    this.$store.dispatch('fetchSections', this.siteId)
  },
  computed: {
    ...mapState(['sections', 'locations']),
    siteId () { // hack location to last one for demo purposes
      return this.locations[this.locations.length - 1].id
    }
  },
  data: () => ({
    sectionName: undefined,
    selectedRental: undefined,
    editVisible: false,
    form: {},
    formLabelWidth: '120px'
  }),
  methods: {
    decrementRental (section) {
      let last = Math.max(...section.rentals.map(i => i.number))
      let rental = section.rentals.find(i => i.number === last)
      if (rental) {
        this.$store.dispatch('decrementRental', {
          rentalId: rental.id,
          sectionId: section.id,
          siteId: this.siteId
        })
      }
    },
    incrementRental (section) {
      this.$store.dispatch('incrementRental', {
        increment: true,
        section_id: section.id,
        site_id: this.siteId
      })
    },
    async addSection () {
      this.$store.dispatch('createSection', {
        site_id: this.siteId,
        section: { name: this.sectionName }
      })
      this.sectionName = undefined
    },
    editSection (section) {
      // TODO
    },
    editRental (rental) {
      this.form = rental.reservation || {}
      this.selectedRental = rental
      this.editVisible = true
    },
    saveRental () {
      // TODO: vuex rental crud
      this.selectedRental.reservation = JSON.parse(JSON.stringify(this.form))// temporary for demo
      this.editVisible = false
      this.selectedRental = undefined
    },
    removeSection (section) {
      if (window.confirm('Are you sure you want to remove this section?')) {
        this.$store.dispatch('deleteSection', {
          id: section.id,
          siteId: this.siteId
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .section-trash, .section-edit {
    display: inline-block;
    font-size: 1rem;
    margin: 0 .3rem;
    cursor: pointer;
    transition: color 200ms ease;
    &:hover {
      color: tomato;
    }
  }
  .section-edit {
    &:hover {
      color: teal;
    }
  }
  .section-rental-actions {
    margin-left: .5rem;
  }
  .grid-section-title {
    margin-right: .3rem;
    display: inline-block;
    color: #7b9aa7;
    font-weight: bold;
    font-size: 1.3rem;
  }
  .grid-section {
    display: inline-block;
    background: rgba(255, 255, 255, 0.514);
    border-radius: 7px;
    padding: .5rem 1rem;
  }
  .grid-sections {
    position: absolute;
    top: 17%;
    left: 2rem;
  }
  .grid-actions {
    padding: 1rem;
  }
  .grid-layout {height: 100%;}
  .sets-bg {
    position: relative;
    height: 100%;
    background: url("../../assets/beach_grid_bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    border: 1rem solid whitesmoke;
    color:  #606060;
  }
  .set {
    padding: .5rem .8rem;
    background: #fff;
    border: 1px solid #ccc;
    margin: 1rem .4rem;
    display: inline-block;
    cursor: pointer;
    &:hover {
      color: #409EFF;
      border-color: #c6e2ff;
    }
  }
  .occupied {
    background: #d9fefe;
  }
  .section-label {
    margin-right: .8rem;
    font-weight: 700;
  }
  .section {
    label {
      margin-right: .8rem;
      font-weight: 700;
    }
    margin: .8rem 0;
  }
</style>
