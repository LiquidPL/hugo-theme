import NavMobile from "./nav-mobile";

class App {
  navMobile: NavMobile;

  constructor() {
    this.navMobile = new NavMobile();
  }
}

declare global {
  interface Window {
    app: App;
  }
}

export default new App();
