import GameScreenView from '../view/game-screen-view';
import HeaderView from '../view/header-view';
import GameGenreView from '../view/genre-view';
import GameAtistView from '../view/artist-view';
import {ONE_SECOND} from '../utils';
import Application from '../application';


export default class GameScreen {
  constructor(model) {
    this.model = model;

    this.screen = new GameScreenView(this.model.state);
    this.blockHeader = new HeaderView(this.model.state);
    this.blockContent = (this.model.isGameGenre()) ? new GameGenreView(this.model.state) : new GameAtistView(this.model.state);

    this.screen.element.insertAdjacentElement(`afterbegin`, this.blockHeader.element);
    this.screen.element.querySelector(`.game__screen`).appendChild(this.blockContent.element);

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
    this.blockContent.playAudio();
    this.blockContent.initSetting();
    this.blockContent.onAnswer = () => (this.model.isGameGenre()) ? this.answerGenre() : this.answerArtist();
  }

  startGame() {
    this._tick();
    this._initGame();
    this.model.restart();
    this.updateHeader();
  }

  stopGame() {
    clearInterval(this._timer);
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.screen.element.replaceChild(header.element, this.blockHeader.element);
    this.blockHeader = header;
    this.blockHeader.onClick = () => {
      Application.showWelcome();
      this.stopGame();
    };
    this.timeOut();
  }

  updateContent() {
    const contentGame = (this.model.isGameGenre()) ? new GameGenreView(this.model.state) : new GameAtistView(this.model.state);
    this.screen.element.querySelector(`.game__screen`).replaceChild(contentGame.element, this.blockContent.element);
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
    if (this.model.state.time === 0) {
      Application.showResult(this.model.state);
      this.stopGame();
    }
  }

  _getAnswer(cssClass, correctAnswer) {
    const inputElement = this.screen.element.querySelectorAll(cssClass);
    const answerEls = [...inputElement];

    const userAnswers = answerEls.filter((it) => it.checked);
    const result = userAnswers.every((it) => {
      return it.value === correctAnswer;
    });

    this.model.addAnswer(result);

    if (result !== true) {
      this.model.changeNotes();
    }
    this.goToNextLevel();
  }

  answerGenre() {
    this._getAnswer(`.game__input`, this.model.getCorrectAnswerGenre());
  }

  answerArtist() {
    this._getAnswer(`.artist__input`, this.model.getCorrectAnswerArtist());
  }

}
