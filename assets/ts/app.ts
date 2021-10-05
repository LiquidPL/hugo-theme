import NavMobile from "./nav-mobile";
import LandingTooltip from "./landing-tooltip";
import TimeFormat from "./time-format";
import ThemeSwitcher from "./theme-switcher";

class App {
  themeSwitcher: ThemeSwitcher;
  navMobile: NavMobile;
  landingTooltip: LandingTooltip;
  timeFormat: TimeFormat;

  constructor() {
    this.themeSwitcher = new ThemeSwitcher();
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
