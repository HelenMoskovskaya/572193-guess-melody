import AbstractView from './abstract-view';

export default class GameGenreView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return `
  <form class="game__tracks">
    ${this.game.questions.map((it) => `
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
          for (let j = 0; j < playButtons.length; j++) {
            playButtons[j].classList.remove(`track__button--pause`);
            audioTracks[j].pause();
          }
          button.classList.add(`track__button--pause`);
          audioTracks[i].play();
        }
      });
    });
  }
}
