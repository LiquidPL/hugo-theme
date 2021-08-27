import NavMobile from "./nav-mobile";
import LandingTooltip from "./landing-tooltip";
import TimeFormat from "./time-format";

class App {
  navMobile: NavMobile;
  landingTooltip: LandingTooltip;
  timeFormat: TimeFormat;

  constructor() {
    this.navMobile = new NavMobile();
    this.landingTooltip = new LandingTooltip();
    this.timeFormat = new TimeFormat();
  }
}

declare global {
  interface Window {
    app: App;
  }
}

export default new App();
