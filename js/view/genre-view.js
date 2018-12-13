import AbstractView from './abstract-view';
import {GAME_LEVELS} from '../data';


export default class GameGenreView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.level = GAME_LEVELS[state.level];
  }

  get template() {
    return `
  <h2 class="game__title">${this.level.title}</h2>

  <form class="game__tracks">
    ${this.level.questions.map((it) => `
      <div class="track">
        <button class="track__button track__button--play" type="button"></button>
        <div class="track__status">
          <audio src="${it.src}"></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="${it.genre}" id="answer-${it.src}">
          <label class="game__check" for="answer-${it.src}">Отметить</label>
        </div>
      </div>`).join(``)}
    <button class="game__submit button" type="submit">Ответить</button>
  </form>`;
  }

  bind() {
    const gameGenreSubmitBtnElement = this.element.querySelector(`.game__submit`);

    const onGameSubmitClick = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      this.onAnswer();
    };

    gameGenreSubmitBtnElement.addEventListener(`click`, onGameSubmitClick);
  }

  initSetting() {
    this.element.querySelector(`.game__submit`).setAttribute(`disabled`, true);

    this.element.querySelectorAll(`.game__input`).forEach((element) => {
      element.addEventListener(`click`, () => {
        this.element.querySelector(`.game__submit`).removeAttribute(`disabled`);
      });
    });
  }

  playAudio() {
    const formGenreElement = this.element.querySelector(`.game__tracks`);
    const trackGenreBtnElement = formGenreElement.querySelectorAll(`.track__button`);
    const audioTrackGenreElement = formGenreElement.querySelectorAll(`audio`);
    const playButtons = [...trackGenreBtnElement];
    const audioTracks = [...audioTrackGenreElement];

    audioTracks[0].setAttribute(`autoplay`, true);
    playButtons[0].classList.add(`track__button--pause`);

    playButtons.forEach((button, i) => {
      button.addEventListener(`click`, () => {
        if (button.classList.contains(`track__button--pause`)) {
          audioTracks[i].pause();
          button.classList.remove(`track__button--pause`);
        } else {
          playButtons.forEach((it) => {
            it.classList.remove(`track__button--pause`);
          });
          audioTracks.forEach((it) => {
            it.pause();
          });
          button.classList.add(`track__button--pause`);
          audioTracks[i].play();
        }
      });
    });
  }
}
