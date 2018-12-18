import {INITIAL_STATE} from '../data';
import {clearArray, GameInfo} from '../utils';


export default class GameModel {
  constructor(data) {
    this.data = data;
    this.restart();
  }

  get state() {
    return this._state;
  }

  get currentLevel() {
    return this.data[this._state.level];
  }

  isGameGenre() {
    return this.currentLevel.type === `genre`;
  }

  getCorrectAnswerGenre() {
    return this.data[this._state.level].answers.filter((it) => it.genre === this.data[this._state.level].genre);
  }

  getCorrectGenre() {
    return this.data[this._state.level].genre;
  }

  addAnswer(result, Answertime) {
    if (result !== true) {
      Answertime = GameInfo.FAIL_RESULT;
    }

    this._state.userAnswersInfo.push({
      option: result,
      time: Answertime
    });
  }

  tick() {
    this._state = Object.assign({}, this.state, {time: this._state.time - 1});
  }

  changeLevel() {
    return this._state.level++;
  }

  changeNotes() {
    return this._state.notes++;
  }

  getRigthForNextLevel() {
    return this._state.notes < GameInfo.MAX_NOTES && this._state.level < GameInfo.MAX_LEVEL;
  }

  restart() {
    this._state = Object.assign({}, INITIAL_STATE);
    clearArray(this._state.userAnswersInfo);
  }
}
