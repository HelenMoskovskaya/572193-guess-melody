import GameScreenView from '../view/game-screen-view';
import HeaderView from '../view/header-view';
import GameGenreView from '../view/genre-view';
import GameAtistView from '../view/artist-view';
import {ONE_SECOND, ContentButtonModal} from '../utils';
import Application from '../application';
import ModalConfirmView from '../view/modal-confirm-view';

export default class GameScreen {
  constructor(model) {
    this.model = model;

    this.screen = new GameScreenView(this.model.currentLevel);
    this.blockHeader = new HeaderView(this.model.state);
    this.blockContent = (this.model.isGameGenre()) ? new GameGenreView(this.model.currentLevel) : new GameAtistView(this.model.currentLevel);
    this.modalConfirm = new ModalConfirmView();

    this.screen.element.insertAdjacentElement(`afterbegin`, this.blockHeader.element);
    this.gameContentElement = this.screen.element.querySelector(`.game__screen`);
    this.gameContentElement.insertAdjacentElement(`beforeend`, this.blockContent.element);

    this._timer = null;
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  _tick() {
    this.model.tick();
    this._updateHeader();
    this._timer = setTimeout(() => this._tick(), ONE_SECOND);
  }

  _initSettingForGame() {
    const buttonSubmitElement = this.blockContent.element.querySelector(`.game__submit`);
    const gameInputElement = this.blockContent.element.querySelectorAll(`.game__input`);

    if (this.model.isGameGenre()) {
      buttonSubmitElement.setAttribute(`disabled`, true);
      gameInputElement.forEach((it) => {
        it.addEventListener(`click`, () => {
          buttonSubmitElement.removeAttribute(`disabled`);
        });
      });
    } else {
      this.blockContent.element.querySelector(`audio`).setAttribute(`autoplay`, true);
      this.blockContent.element.querySelector(`.track__button`).classList.add(`track__button--pause`);
    }
  }

  _playAudio() {
    if (this.model.isGameGenre()) {
      const formGenreElement = this.blockContent.element.querySelector(`.game__tracks`);
      const trackGenreBtnElement = formGenreElement.querySelectorAll(`.track__button`);
      const audioTrackGenreName = formGenreElement.querySelectorAll(`audio`);
      const playButtons = [...trackGenreBtnElement];
      const audioTracks = [...audioTrackGenreName];

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
    } else {
      const trackArtistBtnElement = this.blockContent.element.querySelector(`.track__button`);
      const audioTrackArtistName = this.blockContent.element.querySelector(`audio`);

      const checkAudio = () => {
        if (trackArtistBtnElement.classList.contains(`track__button--pause`)) {
          trackArtistBtnElement.classList.remove(`track__button--pause`);
          audioTrackArtistName.pause();
        } else {
          trackArtistBtnElement.classList.add(`track__button--pause`);
          audioTrackArtistName.play();
        }
      };
      trackArtistBtnElement.addEventListener(`click`, checkAudio);
    }
  }


  _initGame() {
    this.startTime = this.model.state.time;
    this._initSettingForGame();
    this._playAudio();
    this.blockContent.onAnswer = () => (this.model.isGameGenre()) ? this._getAnswerGenre() : this._getAnswerArtist();
  }

  startGame() {
    this._tick();
    this._initGame();
    this.model.restart();
    this._updateHeader();
  }

  _stopGame() {
    clearTimeout(this._timer);
  }

  _updateHeader() {
    const header = new HeaderView(this.model.state);
    this.screen.element.replaceChild(header.element, this.blockHeader.element);
    this.blockHeader = header;
    this.blockHeader.onClick = () => {
      this.modalConfirm.showModalConfirm();
      this._tick();
      this._stopGame();
    };

    this._timeOut();
  }

  _updateContent() {
    const contentGame = (this.model.isGameGenre()) ? new GameGenreView(this.model.currentLevel) : new GameAtistView(this.model.currentLevel);
    this.gameContentElement.replaceChild(contentGame.element, this.blockContent.element);
    this.blockContent = contentGame;
    this._initGame();
  }

  _goToNextLevel() {
    this.model.changeLevel();
    if (this.model.getRigthForNextLevel()) {
      this._updateContent();
    } else {
      Application.showResult(this.model.state);
      this._stopGame();
    }
  }

  _timeOut() {
    const timerElement = this.element.querySelector(`.timer__value`);
    if (this.model.state.time === 0) {
      Application.showResult(this.model.state);
      this._stopGame();
    }
    if (this.model.state.time < 30) {
      timerElement.style.color = `red`;
      timerElement.style.animation = `blink 1000ms steps(1, end) infinite`;
    }
  }

  _getAnswer(result) {
    const time = this.startTime - this.model.state.time;

    if (result !== true) {
      this.model.changeNotes();
    }
    this.model.addAnswer(result, time);
    this._goToNextLevel();
  }

  _getAnswerGenre() {
    const inputElement = this.screen.element.querySelectorAll(`.game__input`);
    const userAnswers = [...inputElement].filter((it) => it.checked);

    const correctMultiAnswers = this.model.getCorrectAnswerGenre().length === userAnswers.length;
    const result = userAnswers.every((it) => it.value === this.model.getCorrectGenre() && correctMultiAnswers);

    this._getAnswer(result);
  }

  _getAnswerArtist() {
    const inputElement = this.screen.element.querySelectorAll(`.artist__input`);
    const userAnswers = [...inputElement].filter((it) => it.checked);

    const result = userAnswers.every((it) => it.value === `true`);

    this._getAnswer(result);
  }


  bind() {
    this.modalConfirm.onConfirmClick = (evt) => {
      const activeButton = evt.target;
      switch (activeButton.textContent) {
        case ContentButtonModal.YES:
          Application.start();
          this.modalConfirm.element.remove();
          break;
        case ContentButtonModal.NO:
          this.modalConfirm.element.remove();
          break;
      }
    };

    this.modalConfirm.onCloseClick = () => {
      this.modalConfirm.element.remove();
    };
  }
}
