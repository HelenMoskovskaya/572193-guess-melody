import WelcomeView from '../view/welcome-view';
import Application from '../application';
import PreloaderView from '../view/preloader-view';

export default class WelcomeScreen {
  constructor() {
    this.screen = new WelcomeView();
    this.preloader = new PreloaderView();

    this.screen.element.insertAdjacentElement(`afterbegin`, this.preloader.element);

    this.dotsElement = this.preloader.element.querySelector(`.loader__dots`);
    this.textElement = this.preloader.element.querySelector(`.loader__text`);
    this.startButtonElement = this.screen.element.querySelector(`.welcome__button`);
    this.step = 0;
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  _initSettingPreloader() {
    this.preloader.element.style.position = `absolute`;
    this.preloader.element.style.display = `flex`;
    this.preloader.element.style.top = `520px`;
    this.preloader.element.style.left = `310px`;
    this.preloader.element.style.fontSize = `30px`;
    this.dotsElement.style.marginLeft = `5px`;
    this.textElement.style.margin = `0`;
    this.textElement.style.padding = `0`;
  }

  _getPreloadInterval() {
    this.step = (this.step + 1) % 4;
    this.dotsElement.textContent = `${new Array(this.step).fill(`.`).join(``)}`;
  }

  startPreloader() {
    this.startButtonElement.style.visibility = `hidden`;
    this._initSettingPreloader();
    this.interval = setInterval(() => this._getPreloadInterval(), 500);

  }

  stopPreloader() {
    clearInterval(this.interval);
    this.startButtonElement.style.visibility = `visible`;
    this.preloader.element.remove();
  }

  bind() {
    this.screen.onClick = () => Application.showGame();
  }

}
