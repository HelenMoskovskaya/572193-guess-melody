import AbstractView from './abstract-view';

const DEBUG = true;
const DEBUG_STYLE = `style="color: red;"`;

export default class GameAtistView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
  <h2 class="game__title">${this.level.question}</h2>

  <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio src="${this.level.src}"></audio>
      </div>
      <form class="game__artist">
        ${this.level.answers.map((it, i) =>`
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="${it.isCorrect}" id="answer-${i}">
          <label class="artist__name" ${DEBUG && it.isCorrect ? DEBUG_STYLE : ``} for="answer-${i}">
            <img class="artist__picture" src="${it.image.url}" alt="${it.title}">
            ${it.title}
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
