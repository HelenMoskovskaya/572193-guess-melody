import {INITIAL_STATE, GAME_LEVELS} from '../data';
import {clearArray, GameInfo} from '../utils';


const getTypeGame = (state) => GAME_LEVELS[state.level].type;

export default class GameModel {
  constructor() {
    this.restart();
  }

  get state() {
    return this._state;
  }

  isGameGenre() {
    return getTypeGame(this._state) === `game--genre`;
  }

  getCorrectAnswerGenre() {
    return GAME_LEVELS[this._state.level].answers;
  }

  getCorrectAnswerArtist() {
    return GAME_LEVELS[this._state.level].question.artist;
  }

  addAnswer(result) {
    this._state.userAnswersInfo.push({
      option: result,
      time: INITIAL_STATE.time - this._state.time
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
    this._state = INITIAL_STATE;
    clearArray(this._state.userAnswersInfo);
  }
}
