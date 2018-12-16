import LoaderView from '../view/loader-view';

export default class LoaderScreen {
  constructor() {
    this.screen = new LoaderView();
    this.step = 0;
    this.dotsElement = this.screen.element.querySelector(`.loader__dots`);
    this.textElement = this.screen.element.querySelector(`.loader__text`);
  }

  get element() {
    return this.screen.element;
  }

  initSetting() {
    this.screen.element.style.display = `flex`;
    this.screen.element.style.fontSize = `30px`;
    this.dotsElement.style.marginLeft = `5px`;
    this.textElement.style.margin = `0`;
    this.textElement.style.padding = `0`;
  }

  _getInterval() {
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

  start() {
    this.interval = setInterval(() => this._getInterval(), 500);
  }

  stop() {
    clearInterval(this.interval);
  }
}
