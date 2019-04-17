<script>
import { Line } from 'vue-chartjs'
import tooltips from './tooltips'

export default {
  name: 'lineTrend',
  props: ['dates'],
  data () {
    return {
      chartData: {
        labels: ['foo', 'bar', 'baz', 'aux', 'qux', 'loz'],
        datasets: [
          {
            fill: false,
            backgroundColor: '#0074D9',
            borderColor: '#0074D9',
            data: []
          }
        ]
      }
    }
  },
  extends: Line,
  mounted () {
    for (let i = 0; i < 7; i++) {
      this.chartData.datasets[0].data.push(this.getRandomInt(60))
    }
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      title: { display: false },
      legend: { display: false },
      tooltips: {
        enabled: false,
        mode: 'index',
        position: 'nearest',
        custom: tooltips
      },
      layout: {
        padding: {
          right: 40
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }
        }]
      }
    })
  },
  methods: {
    getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
  }
}
</script>

<style lang="scss" scoped>
  canvas#line-chart {
    height: 60px;
  }
  canvas{
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>

<style lang="scss">
#chartjs-tooltip {
  opacity: 1;
  position: absolute;
  background: rgba(0, 0, 0, .7);
  color: white;
  border-radius: 3px;
  -webkit-transition: all .1s ease;
  transition: all .1s ease;
  pointer-events: none;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.chartjs-tooltip-key {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
}
</style>
