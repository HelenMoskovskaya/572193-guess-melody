import AbstractView from './abstract-view';
import {SECONDS_IN_MINUTES, formatWords, getStatResults, Dictionary, getUserScore, CountRules} from '../utils';
import {INITIAL_STATE} from '../data';


export default class ResultSuccessView extends AbstractView {
  constructor(state, data) {
    super();
    this.state = state;
    this.data = data;
    this.resultTime = INITIAL_STATE.time - this.state.time;
    this.minutes = Math.floor(this.resultTime / SECONDS_IN_MINUTES);
    this.seconds = this.resultTime % SECONDS_IN_MINUTES;
    this.fastAnswers = this.state.userAnswersInfo.filter((it) => it < CountRules.FAST_TIME && it >= 0);
    this.quantityFastAnswers = this.fastAnswers.length;
    this.resultText = getStatResults(this.data);
    this.bind();
  }

  get template() {
    return `
  <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За ${this.minutes} ${formatWords(this.minutes, Dictionary.MINUTES)} и ${this.seconds} ${formatWords(this.seconds, Dictionary.SECONDS)} вы набрали ${getUserScore(this.state.userAnswersInfo)} ${formatWords(getUserScore(this.state.userAnswersInfo), Dictionary.POINTS)} (${this.quantityFastAnswers} ${formatWords(this.quantityFastAnswers, Dictionary.FAST_ANSWERS)}), совершив ${this.state.notes} ${formatWords(this.state.notes, Dictionary.MISTAKES)}</p>
    <p class="result__text">${this.resultText}</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>
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
