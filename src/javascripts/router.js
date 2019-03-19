class Router {
  constructor () {
    this.routes = []
    this.init()
  }

  on (route, title, callback) {
    this.routes[route] = { title, callback }
    if (window.location.pathname === route) { this.go(route) }
  }

  go (route, triggerCallbacks = true) {
    if (!(route in this.routes)) { throw Error(`Couldn't find route: ${route}`) }
    window.history.pushState({}, this.routes[route].title, route)
    document.title = this.routes[route].title
    if (triggerCallbacks) { this.triggerCallbacks() }
  }

  triggerCallbacks () {
    if (window.location.pathname in this.routes) {
      this.routes[window.location.pathname].callback.call()
    }
  }

  init () {
    window.onpopstate = this.triggerCallbacks.bind(this)
  }
}

export default Router
