class Router {
  constructor() {
    this.routes = [];
    this.init();
  }

  on(route, title, callback) {
    this.routes[route] = {title, callback};
    if (location.pathname == route) { this.go(route); }
  }

  go(route, callOnChange = true) {
    if (!(route in this.routes)) { throw Error(`Couldn't find route: ${route}`); }
    history.pushState({}, this.routes[route].title, route);
    document.title = this.routes[route].title;
    if (callOnChange) { this.onChange(); }
  }

  onChange() {
    if (location.pathname in this.routes) {
      this.routes[location.pathname].callback.call();
    }
  }

  init() {
    window.onpopstate = this.onChange.bind(this);
  }
}

export default Router;