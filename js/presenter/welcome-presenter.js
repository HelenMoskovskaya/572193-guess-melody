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
    this.startButton = this.screen.element.querySelector(`.welcome__button`);
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
    const Stepdots = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
    };

    this.step++;
    switch (this.step) {
      case Stepdots.ONE:
        this.dotsElement.textContent = `.`;
        break;
      case Stepdots.TWO:
        this.dotsElement.textContent = `..`;
        break;
      case Stepdots.THREE:
        this.dotsElement.textContent = `...`;
        break;
      default:
        this.dotsElement.textContent = ``;
        this.step = 0;
        break;
    }
  }

  startPreloader() {
    this.startButton.style.visibility = `hidden`;
    this._initSettingPreloader();
    this.interval = setInterval(() => this._getPreloadInterval(), 500);

  }

  stopPreloader() {
    clearInterval(this.interval);
    this.startButton.style.visibility = `visible`;
    this.preloader.element.remove();
  }

  bind() {
    this.screen.onClick = () => Application.showGame();
  }

}
