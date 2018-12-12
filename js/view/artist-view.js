import AbstractView from './abstract-view';
import {GAME_LEVELS} from '../data';


export default class GameAtistView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.level = GAME_LEVELS[state.level];
  }

  get template() {
    return `
  <h2 class="game__title">${this.level.title}</h2>

  <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio src="${this.level.question.src}"></audio>
      </div>
      <form class="game__artist">
        ${this.level.answers.map((it) =>`
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="${it.artist}" id="answer-${it.src}">
          <label class="artist__name" for="answer-${it.src}">
            <img class="artist__picture" src="${it.image}" alt="${it.artist}">
            ${it.artist}
          </label>
        </div>
        `).join(``)}
      </form>`;
  }

  bind() {
    const inputArtistElement = this.element.querySelectorAll(`.artist__input`);

    inputArtistElement.forEach((it) => {
      it.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.onAnswer(it);
      });
    });
  }

  onAnswer() {

  }

  initSetting() {
    this.element.querySelector(`audio`).setAttribute(`autoplay`, true);
    this.element.querySelector(`.track__button`).classList.add(`track__button--pause`);
  }

  playAudio() {
    const trackArtistBtnElement = this.element.querySelector(`.track__button`);
    const audioTrackArtistElement = this.element.querySelector(`audio`);

    const checkAudio = () => {
      if (trackArtistBtnElement.classList.contains(`track__button--pause`)) {
        trackArtistBtnElement.classList.remove(`track__button--pause`);
        audioTrackArtistElement.pause();
      } else {
        trackArtistBtnElement.classList.add(`track__button--pause`);
        audioTrackArtistElement.play();
      }
    };
    trackArtistBtnElement.addEventListener(`click`, checkAudio);
  }
}
