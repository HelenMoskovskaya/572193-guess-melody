import AbstractView from './abstract-view';
import {showFailResult} from '../utils';


export default class ResultFailView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;

  }

  get template() {
    return `
  <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">${showFailResult(this.state).title}</h2>
    <p class="result__total result__total--fail">${showFailResult(this.state).resultTotal}</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>`;
  }

  bind() {
    const backButtonElement = this.element.querySelector(`.result__replay`);

    const onBackButtonClick = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      this.onBack();
    };

    backButtonElement.addEventListener(`click`, onBackButtonClick);
  }

  onBack() {

  }

}
