<template lang='pug'>
div
  .header-title
    h1 Advanced Reporting
  el-main(v-if='!loading')
    el-row.box
      el-col(:span="24", :md="8")
        .stat
          h2 Revenue Per Site
          .pie
            pie-sales(:locations='locations')
      el-col(:span="24", :md="8")
        .stat
          h2 Revenue Per Day
          .pie
            salesBar(:locations='locations')
      el-col(:span="24", :md="8")
        .stat
          h2 Revenue Total
          .sum
            span $260,054
    el-row.box
      el-table(:data="tableData", style="width: 100%")
        el-table-column(label="Site", prop='site')
          template(slot-scope="scope")
            strong {{scope.row.site}}
        el-table-column(label="Reservations", prop='reservations')
        el-table-column(label="Revenue", prop='revenue')
        el-table-column(label="Trend", prop="trend")
          template(slot-scope='scope')
            line-trend

</template>

<script>
import pieSales from '@/components/charts/pie_sales'
import salesBar from '@/components/charts/sales_bar'
import lineTrend from '@/components/charts/line_trend'
export default {
  components: { pieSales, salesBar, lineTrend },
  name: 'Reporting',
  data () {
    return {
      loading: true,
      tableData: []
    }
  },
  async created () {
    await this.$store.dispatch('fetchLocations')
    this.locations.forEach((location) => {
      let reservations = this.getRandomInt(1000)
      let revenue = reservations * 5
      this.tableData.push({ site: location.name, reservations: reservations, revenue: `$${revenue}`, trend: 'foo' })
    })
    this.loading = false
  },
  computed: {
    locations () {
      return this.$store.state.locations
    }
  },
  methods: {
    getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max))
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
      font-family: "Roboto Slab";
    }
  }
  .pie{
    padding: 25px;
  }
  .sum {
    font-family: "Roboto Slab";
    color: #85144B;
    font-size: 65px;
    vertical-align: middle;
    height: 175px;
    text-align: center;
display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  }
  .el-col{
    border-left: 1px solid #ebedf2;
    .stat {
      h2 {
        font-family: "Roboto Slab";
        color: #909399;
        font-size: 18px;
        padding-left: 20px;
      }
      padding: 10px;
      .pie{
        padding: 10px;
      }
    }
  }
  .box{
    margin: 1rem 1rem 2rem 1rem;
    box-shadow: 0 4px 50px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.1);
  }
</style>
