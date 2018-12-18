import GameScreenView from '../view/game-screen-view';
import HeaderView from '../view/header-view';
import GameGenreView from '../view/genre-view';
import GameAtistView from '../view/artist-view';
import {ONE_SECOND} from '../utils';
import Application from '../application';


export default class GameScreen {
  constructor(model) {
    this.model = model;

    this.screen = new GameScreenView(this.model.currentLevel);
    this.blockHeader = new HeaderView(this.model.state);
    this.blockContent = (this.model.isGameGenre()) ? new GameGenreView(this.model.currentLevel) : new GameAtistView(this.model.currentLevel);

    this.screen.element.insertAdjacentElement(`afterbegin`, this.blockHeader.element);
    this.gameContentElement = this.screen.element.querySelector(`.game__screen`);
    this.gameContentElement.appendChild(this.blockContent.element);
    this._timer = null;
  }

  get element() {
    return this.screen.element;
  }

  _tick() {
    this.model.tick();
    this.updateHeader();
    this._timer = setTimeout(() => this._tick(), ONE_SECOND);
  }


  _initGame() {
    this.startTime = this.model.state.time;
    this.blockContent.playAudio();
    this.blockContent.initSetting();
    this.blockContent.onAnswer = () => (this.model.isGameGenre()) ? this._getAnswerGenre() : this._getAnswerArtist();
  }

  startGame() {
    this._tick();
    this._initGame();
    this.model.restart();
    this.updateHeader();
  }

  stopGame() {
    clearTimeout(this._timer);
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.screen.element.replaceChild(header.element, this.blockHeader.element);
    this.blockHeader = header;
    this.blockHeader.onClick = () => {
      Application.start();
      this.stopGame();
    };

    this.timeOut();
  }

  updateContent() {
    const contentGame = (this.model.isGameGenre()) ? new GameGenreView(this.model.currentLevel) : new GameAtistView(this.model.currentLevel);
    this.gameContentElement.replaceChild(contentGame.element, this.blockContent.element);
    this.blockContent = contentGame;
    this._initGame();

  }

  goToNextLevel() {
    this.model.changeLevel();
    if (this.model.getRigthForNextLevel()) {
      this.updateContent();
    } else {
      Application.showResult(this.model.state);
      this.stopGame();
    }
  }

  timeOut() {
    const timerElement = this.element.querySelector(`.timer__value`);
    if (this.model.state.time === 0) {
      Application.showResult(this.model.state);
      this.stopGame();
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
    this.goToNextLevel();
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


}
