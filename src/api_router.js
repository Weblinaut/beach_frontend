export default class APIRoute {
  static get basePath () {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:3000'
    } else {
      return 'https://api.beachset.link'
    }
  }
  static get login () {
    return `${this.basePath}/sessions`
  }
  static get signup () {
    return `${this.basePath}/users`
  }
  static get locations () {
    return `${this.basePath}/sites`
  }
  static location (id) {
    return `${this.basePath}/sites/${id}`
  }
  static get attendants () {
    return `${this.basePath}/attendants`
  }
  static attendant (id) {
    return `${this.basePath}/attendants/${id}`
  }

  static sections (options = {}) {
    let queryString = options.siteId ? `?site_id=${options.siteId}` : ''
    let params = options.id || ''
    return `${this.basePath}/sections/${params}${queryString}`
  }

  static rentals (options = {}) {
    let queryString = options.siteId ? `?site_id=${options.siteId}&` : ''
    queryString = options.sectionId ? `${queryString}section_id=${options.sectionId}` : ''
    let params = options.rentalId || ''
    return `${this.basePath}/rentals/${params}${queryString}`
  }

  static get reservations () {
    return `${this.basePath}/reservations`
  }

  static image (path) {
    return `${this.basePath}${path}`
  }
}
