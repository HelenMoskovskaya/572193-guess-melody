import AbstractView from './abstract-view';
import {INITIAL_STATE} from '../data';


const getMinutes = (time) => {
  const result = Math.floor(time / 60);
  return result < 10 ? `0` + result : result;
};

const getSeconds = (time)=> {
  const result = Math.floor(time % 60);
  return result < 10 ? `0` + result : result;
};

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  _getDash() {
    const RADIUS = 370;
    const CIRCLE_LENGTH = Math.round(2 * Math.PI * RADIUS);
    const time = INITIAL_STATE.time - this.state.time;

    const dash = {};
    dash.stroke = CIRCLE_LENGTH;
    dash.offset = Math.round(CIRCLE_LENGTH / INITIAL_STATE.time * time);

    return dash;
  }

  get template() {
    return `
  <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370" stroke-dasharray="${this._getDash().stroke}" stroke-dashoffset="${this._getDash().offset}"
                style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
      </svg>

      <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer__mins">${getMinutes(this.state.time)}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${getSeconds(this.state.time)}</span>
      </div>

      <div class="game__mistakes">
        ${new Array(this.state.notes).fill(`<div class="wrong"></div>`).join(``)}
      </div>
  </header>`;
  }

  bind() {
    const gameLogoElement = this.element.querySelector(`.game__back`);

    const onGameLogoClick = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      this.onClick();
    };

    gameLogoElement.addEventListener(`click`, onGameLogoClick);
  }

  onClick() {

  }
}
