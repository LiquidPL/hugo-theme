import NavMobile from "./nav-mobile";
import LandingTooltip from "./landing-tooltip";

class App {
  navMobile: NavMobile;
  landingTooltip: LandingTooltip;

  constructor() {
    this.navMobile = new NavMobile();
    this.landingTooltip = new LandingTooltip();
  }
}

declare global {
  interface Window {
    app: App;
  }
}

export default new App();
