import AbstractView from './abstract-view';
import {gameStates, showResult} from '../game-control';


export default class ResultView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return `
  <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">${showResult(gameStates).title}</h2>
    <p class="result__total">${showResult(gameStates).resultTotal}</p>
    <p class="result__text">${showResult(gameStates).resultText}</p>
    <button class="result__replay" type="button">${showResult(gameStates).textButton}</button>
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
