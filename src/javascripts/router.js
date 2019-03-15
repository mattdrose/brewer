class Router {
  constructor() {
    this.routes = [];
    this.init();
  }

  on(route, title, callback) {
    this.routes[route] = {title, callback};
    if (location.pathname == route) { this.go(route); }
  }

  go(route, triggerCallbacks = true) {
    if (!(route in this.routes)) { throw Error(`Couldn't find route: ${route}`); }
    history.pushState({}, this.routes[route].title, route);
    document.title = this.routes[route].title;
    if (triggerCallbacks) { this.triggerCallbacks(); }
  }

  triggerCallbacks() {
    if (location.pathname in this.routes) {
      this.routes[location.pathname].callback.call();
    }
  }

  init() {
    window.onpopstate = this.triggerCallbacks.bind(this);
  }
}

export default Router;