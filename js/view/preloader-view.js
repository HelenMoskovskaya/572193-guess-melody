import AbstractView from './abstract-view';

export default class PreloaderView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
  <div class="loader">
    <p class="loader__text">Загружается</p>
  </div>
  <div class="loader__dots">&nbsp;</div>`;
  }
}
