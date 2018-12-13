import AbstractView from './abstract-view';
import {showResult} from '../utils';

export default class ResultView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
  <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">${showResult(this.state).title}</h2>
    <p class="result__total">${showResult(this.state).resultTotal}</p>
    <p class="result__text">${showResult(this.state).resultText}</p>
    <button class="result__replay" type="button">${showResult(this.state).textButton}</button>
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
