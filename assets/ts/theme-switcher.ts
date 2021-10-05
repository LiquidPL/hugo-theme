import Cookies from 'js-cookie';

type Theme = 'light'|'dark';

const THEME_COOKIE = 'theme';

export default class ThemeSwitcher {
  currentTheme!: Theme;

  toggle: HTMLElement;
  buttonLight: HTMLElement;
  buttonDark: HTMLElement;

  constructor() {
    const currentTheme = this.getCurrentTheme();

    this.setTheme(currentTheme);

    // delay enabling transitions so the screen doesn't
    // flash when enabling dark theme on load
    setTimeout(() => this.enableTransitions(), 500);

    this.toggle = document.querySelector('.js--theme-toggle') as HTMLElement;
    this.buttonLight = document.querySelector('.js--theme-light') as HTMLElement;
    this.buttonDark = document.querySelector('.js--theme-dark') as HTMLElement;

    this.toggle.addEventListener('click', this.toggleTheme);

    this.buttonLight.addEventListener('click', () => this.setTheme('light'));
    this.buttonDark.addEventListener('click', () => this.setTheme('dark'));
  }

  private getCurrentTheme(): Theme {
    const cookieTheme = this.getCurrentCookieTheme();
    const systemTheme = this.getCurrentSystemTheme();

    if (cookieTheme !== undefined) {
      return cookieTheme;
    } else {
      return systemTheme;
    }
  }

  private getCurrentSystemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private getCurrentCookieTheme(): Theme|undefined {
    return Cookies.get(THEME_COOKIE);
  }

  private setTheme(theme: Theme) {
    if (this.currentTheme === theme) {
      return;
    }

    this.currentTheme = theme;

    const root = document.querySelector(':root') as HTMLElement;
    root.dataset.theme = this.currentTheme;

    Cookies.set(THEME_COOKIE, theme);
  }

  private enableTransitions() {
    const root = document.querySelector(':root') as HTMLElement;

    root.dataset.themeTransitionsEnabled = 'true';
  }

  private toggleTheme = () => {
    this.setTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
  }
}
