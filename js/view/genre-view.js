import AbstractView from './abstract-view';

const DEBUG = true;
const DEBUG_STYLE = `style="background-color: yellow;"`;

export default class GameGenreView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
  <h2 class="game__title">${this.level.question}</h2>

  <form class="game__tracks">
    ${this.level.answers.map((it) => `
      <div class="track">
        <button class="track__button track__button--play" type="button"></button>
        <div class="track__status">
          <audio src="${it.src}"></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="${it.genre}" id="answer-${it.src}">
          <label class="game__check" ${DEBUG && it.genre === this.level.genre ? DEBUG_STYLE : ``} for="answer-${it.src}">Отметить</label>
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
}
