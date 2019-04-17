<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'salesBar',
  props: ['locations'],
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ['#001F3F', '#0074D9', '#7FDBFF', '#39CCCC'],
            strokeColor: 'rgba(220,220,220,0.8)',
            highlightFill: 'rgba(220,220,220,0.75)',
            highlightStroke: 'rgba(220,220,220,1)'
          }
        ]
      }
    }
  },
  extends: Bar,
  async mounted () {
    // Overwriting base render method with actual data.
    for (var i = 1; i <= 7; i++) {
      this.chartData.labels.push(this.$moment().subtract(i, 'days').format('MM/DD/YYYY'))
      this.chartData.datasets[0].data.push(this.getRandomInt(5000))
    }
    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false, legend: { display: false } })
  },
  methods: {
    getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
  }
}
</script>

<style lang="scss" scoped>
canvas#bar-chart {
  height: 175px;
}
</style>
