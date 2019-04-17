import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import APIRoute from './api_router'
import jwt from 'jsonwebtoken'
const { Weather } = require('openweathermap-apis')
const client = new Weather({
  apiKey: '24390d60239290e9bf153b206fe99ab0',
  units: 'imperial',
  port: location.protocol === 'https:' ? '443' : '80'
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: ''
    },
    sections: [],
    locations: [],
    weather: {},
    attendants: [],
    currentLocationId: undefined
  },
  getters: {
    currentLocation (state) {
      let id = state.currentLocationId || localStorage.getItem('currentLocation')
      if (!id) return
      return state.locations.find(i => i.id.toString() === id.toString())
    },
    has_role: (state) => (role) => {
      return state.user.user && state.user.user.role.includes(role)
    }
  },
  mutations: {
    logout (state) {
      state.user = {}
      window.localStorage.removeItem('user_token')
    },
    setUser (state, jwtToken) {
      let decoded = jwt.decode(jwtToken)
      state.user = decoded
      window.localStorage.setItem('user_token', jwtToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
    },
    setLocations (state, locations) {
      state.locations = locations
    },
    setAttendants (state, attendants) {
      state.attendants = attendants
    },
    setWeather (state, payload) {
      Vue.set(state.weather, payload.zip, payload.weather)
    },
    setCurrentLocation (state, payload) {
      localStorage.setItem('currentLocation', payload)
      state.currentLocationId = payload
    }
  },
  actions: {
    async login (context, payload) {
      const response = await axios.post(APIRoute.login, { email: payload.email, password: payload.password })
      if (response.status === 201) {
        context.commit('setUser', response.data.token)
      }
    },
    async signup (context, payload) {
      await axios.post(APIRoute.signup, payload)
      context.state.user.email = payload.user.email
    },
    async fetchSections (context, siteId) {
      const resp = await axios.get(APIRoute.sections({ siteId }))
      context.state.sections = resp.data.sections
    },
    async createSection (context, payload) {
      try {
        const resp = await axios.post(APIRoute.sections(), payload)
        context.state.sections.push(resp.data)
      } catch (err) {
        alert(err)
      }
    },
    async deleteSection (context, payload) {
      const { id, siteId } = payload
      try {
        await axios.delete(APIRoute.sections({ id, siteId }))
        let index = context.state.sections.findIndex(i => i.id === payload.id)
        context.state.sections.splice(index, 1)
      } catch (err) {
        alert(err)
      }
    },
    async incrementRental (context, payload) {
      try {
        const resp = await axios.post(APIRoute.rentals(), payload)
        let section = context.state.sections.find(i => i.id === payload.section_id)
        section.rentals.push(resp.data)
      } catch (err) {
        alert(err)
      }
    },
    async decrementRental (context, payload) {
      const { rentalId, sectionId } = payload
      try {
        await axios.delete(APIRoute.rentals(payload))
        let section = context.state.sections.find(i => i.id === sectionId)
        let index = section.rentals.findIndex(i => i.id === rentalId)
        section.rentals.splice(index, 1)
      } catch (err) {
        alert(err)
      }
    },
    async fetchLocations (context) {
      const response = await axios.get(APIRoute.locations)
      context.commit('setLocations', response.data.sites)
    },
    async createLocation (context, payload) {
      await axios.post(APIRoute.locations, payload)
      await context.dispatch('fetchLocations')
    },
    async deleteLocation (context, id) {
      await axios.delete(APIRoute.location(id))
      await context.dispatch('fetchLocations')
    },
    async updateLocation (context, payload) {
      await axios.patch(APIRoute.location(payload.id), payload)
      await context.dispatch('fetchLocations')
    },
    async fetchAttendants (context) {
      const response = await axios.get(APIRoute.attendants)
      context.commit('setAttendants', response.data.attendants)
    },
    async createAttendant (context, payload) {
      let formData = new FormData(payload)
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key])
      })
      await axios.post(APIRoute.attendants, formData)
      await context.dispatch('fetchAttendants')
    },
    async deleteAttendant (context, id) {
      await axios.delete(APIRoute.attendant(id))
      await context.dispatch('fetchAttendants')
    },
    async updateAttendant (context, payload) {
      let formData = new FormData(payload)
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key])
      })
      if (typeof formData.get('avatar') === 'string') {
        formData.delete('avatar')
      }
      await axios.patch(APIRoute.attendant(payload.id), formData)
      await context.dispatch('fetchAttendants')
    },
    async getWeather (context, payload) {
      if (context.state.weather[payload.zipcode]) return
      let data = await client.now({ zip: payload.zipcode, country: 'us' })
      context.commit('setWeather', { zip: payload.zipcode, weather: data })
    },
    async fetchCurrentLocationId (context) {
      const id = await context.state.currentLocationId || localStorage.getItem('currentLocation')
      return Promise.resolve(id)
    }
  }
})
