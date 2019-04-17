<template lang='pug'>
div
  .header-title
    h1 Manage Users
  add-attendant
  attendant-form(v-bind:visible.sync='editVisible', :form="editData", :submitMethod="save")
  el-main
    el-row
      .wrap
        .flexbox(v-for="attendant in attendants")
          .box-inner
              el-card.box-card
                .header(slot="header")
                  img.avatar(:src='imageUrl(attendant)')
                  span.title {{attendant.firstname}} {{attendant.lastname}}
                  .actions
                    a(@click='showEdit(attendant)')
                      i.material-icons create
                    a(@click='remove(attendant.id)')
                      i.material-icons clear
                .content
                  span {{ attendant.email }}
</template>

<script>
import addAttendant from '@/components/attendants/add'
import attendantForm from '@/components/attendants/form'
import APIRouter from '@/api_router'
import * as gravatar from 'gravatar'
export default {
  components: {
    addAttendant, attendantForm
  },
  name: 'Users',
  data () {
    return {
      editVisible: false,
      editData: {}
    }
  },
  mounted () {
    this.$store.dispatch('fetchAttendants')
  },
  computed: {
    attendants () {
      return this.$store.state.attendants
    }
  },
  methods: {
    imageUrl (user) {
      if (user.avatar) {
        return APIRouter.image(user.avatar)
      } else {
        return gravatar.url(user.email, { d: 'robohash' })
      }
    },
    async save (payload) {
      await this.$store.dispatch('updateAttendant', payload)
    },
    showEdit (row) {
      this.editData = row
      this.editVisible = true
    },
    remove (index) {
      this.$store.dispatch('deleteAttendant', index)
    }
  }
}
</script>

<style lang="scss" scoped>
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
    margin: 0 -5px;
    .flexbox {
       margin: 0 5px;
      box-sizing: border-box;
      margin-bottom: 20px;
      flex-basis: 25%;
      flex-grow: 1;
      flex-shrink: 1;
      .box-inner {
        .el-card__body{
          padding: 0;
        }
        .header{
          display: flex;
          align-items: center;
          .avatar {
            margin-right: 10px;
          }
          .actions {
            a {
              cursor: pointer;
            }
            margin-left: auto;
          }
        }
        width: 100%;
        height: 100%;
        span.title {
          font-weight: bold;
          font-family: 'Roboto Slab', serif;
          font-size: 20px;
        }
        .avatar {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;

          object-fit: cover;
        }
      }
    }
  }
</style>
