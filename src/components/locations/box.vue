<template lang="pug">
.box-inner
  location-form(v-bind:visible.sync='editVisible', :form="location", :submitMethod="save")
  el-card.box-card(:body-style="{padding: 0}")
    .clearfix(slot="header")
      span.title {{location.name}}
      .actions(v-if="$store.getters.has_role('admin')")
        a(@click='edit()')
          i.material-icons create
        a(@click='remove()')
          i.material-icons clear
    .weather(:class="bgClass", v-if='weather')
      .details
        .temp
          span {{Math.ceil(weather.main.temp)}} &#8457
        .text
          span {{weather.weather[0].description}} - {{ timeForLocation.format("hh:MM A")}}
      component(:is='weatherWidget').widget
      .card_actions
        a(title='View Beach')
          i.material-icons beach_access
        a(title='View Reservations')
          i.material-icons calendar_today
</template>

<script>
import locationForm from '@/components/locations/form'
import SunShower from '@/components/weather-icons/sun-shower'
import Sunny from '@/components/weather-icons/sunny'
import Rainy from '@/components/weather-icons/rainy'
import Shower from '@/components/weather-icons/shower'
import Cloudy from '@/components/weather-icons/cloudy'
import SunCloudy from '@/components/weather-icons/sun-cloudy'
import Thunderstorm from '@/components/weather-icons/thunderstorm'
import tzlookup from 'tz-lookup'
export default {
  props: ['location'],
  components: { locationForm, SunShower, Sunny, Rainy, Cloudy, SunCloudy, Thunderstorm, Shower },
  created () {
    this.$store.dispatch('getWeather', this.location)
  },
  data () {
    return {
      editVisible: false,
      iconMap: {
        '01d': 'sunny',
        '01n': 'sunny',
        '02d': 'sun-cloudy',
        '02n': 'sun-cloudy',
        '03d': 'cloudy',
        '03n': 'cloudy',
        '04d': 'cloudy',
        '04n': 'cloudy',
        '09d': 'shower',
        '09n': 'shower',
        '10d': 'sun-shower',
        '10n': 'sun-shower',
        '11d': 'thunderstorm',
        '11n': 'thunderstorm',
        '50d': 'cloudy',
        '50n': 'cloudy'
      }
    }
  },
  computed: {
    weather () {
      return this.$store.state.weather[this.location.zipcode]
    },
    bgClass () {
      let hour = this.timeForLocation.format('HH')
      return `sky-gradient-${hour}`
    },
    timeForLocation () {
      let coord = this.weather.coord
      let tz = tzlookup(coord.lat, coord.lon)
      return this.$moment().tz(tz)
    },
    weatherWidget () {
      return this.iconMap[this.$store.state.weather[this.location.zipcode].weather[0].icon]
    }
  },
  methods: {
    async save () {
      await this.$store.dispatch('getWeather', this.location)
      await this.$store.dispatch('updateLocation', this.location)
    },
    edit () {
      this.editVisible = true
    },
    remove () {
      this.$store.dispatch('deleteLocation', this.location.id)
    }
  }
}
</script>

<style lang="scss" scoped>
 .box-inner {
  position: relative;
  .card_actions{
    position: absolute;
    bottom: 10px;
    right: 10px;
    i {
      padding-left: 10px;
      color: white;
    }
  }
  .el-card__body{
    padding: 0;
  }
  width: 100%;
  height: 100%;
  span.title {
    font-weight: bold;
    font-family: 'Roboto Slab', serif;
    font-size: 20px;
  }
  .weather {
    padding: 20px;
    display: flex;
    .temp {
      font-size: 60px;
      font-weight: bold;
      font-family: 'Roboto Slab', serif;
      color: white;
    }
    .text {
      color: white;
      font-family: 'Roboto Slab', serif;
      font-size: 15px;
    }
    .icon {
      margin-left: auto;
    }
  }
  .actions{
    float: right;
    a {
      cursor: pointer;
      i {
        font-size: 16px;
        justify-content: center;
      }
    }
  }
}
</style>
