export default class NavMobile {
  private hamburger: HTMLDivElement|null;
  private nav: HTMLElement|null;

  constructor() {
    this.hamburger = document.querySelector('.js--hamburger');
    this.nav = document.querySelector('.js--nav');

    this.hamburger?.addEventListener('click', this.onHamburgerClick);
  }

  public onHamburgerClick = (event: MouseEvent) => {
    this.hamburger?.classList.toggle('hamburger--checked');
    this.nav?.classList.toggle('nav--active');
  }
}
