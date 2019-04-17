<script>
import { Pie } from 'vue-chartjs'

export default {
  name: 'pieSales',
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
  extends: Pie,
  mounted () {
    // Overwriting base render method with actual data.
    this.locations.forEach((location) => {
      this.chartData.labels.push(location.name)
      this.chartData.datasets[0].data.push(this.getRandomInt(2000))
    })
    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false, legend: { position: 'left' } })
  },
  methods: {
    getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
  }
}
</script>

<style lang="scss" scoped>
canvas#pie-chart {
  height: 175px;
}
</style>
