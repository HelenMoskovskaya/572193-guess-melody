import AbstractView from './abstract-view';

export default class GameAtistView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return `
  <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio src="${this.game.question.src}"></audio>
      </div>
      <form class="game__artist">
        ${this.game.answers.map((it) =>`
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

  playAudio() {
    const trackArtistBtnElement = this.element.querySelector(`.track__button`);
    const audioTrackArtistElement = this.element.querySelector(`audio`);

    audioTrackArtistElement.setAttribute(`autoplay`, true);
    trackArtistBtnElement.classList.add(`track__button--pause`);

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
