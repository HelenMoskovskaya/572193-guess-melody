import {GameInfo} from './utils';
import {gameLevels, initialState, statistics} from './data';
import gameScreen from './screen/game-screen'
import result from './screen/result'
import {showScreen} from './utils';

const countRules = {
  RIGHT: 1,
  WRONG: -2,
  FAST_RIGHT: 2,
  FAST_TIME: 30
};

export let gameStates = {};

export const startGame = () => {
  gameStates = Object.assign({}, initialState);
  changeLevel(gameStates);
}

export const countScore = (answers, notesLast) => {
  let score = GameInfo.START_SCORE;

  for (let answer of answers) {
    if (answer.option && answer.time < countRules.FAST_TIME) {
      score += countRules.FAST_RIGHT;
    } else if (answer.option !== true) {
      score += countRules.WRONG;
    } else {
      score += countRules.RIGHT;
    }
  }
   if (answers.length < GameInfo.MAX_LEVEL) {
    return GameInfo.FAIL_RESULT;
  } else if (notesLast === GameInfo.MAX_NOTES) {
    return GameInfo.FAIL_RESULT;
  } else {
    return score
  }
};

export const getStatResults = (stat, score) => {
  stat.push(score);
  stat.sort((a,b) => b - a);
  const place = stat.indexOf(score) + 1;
  const allPlaces = stat.length;
  const successRate = Math.round((allPlaces - place) / allPlaces * 100);

  return `Вы заняли ${place} место из ${allPlaces} игроков. Это лучше, чем у ${successRate}% игроков`
};

export const changeLevel = (state) => {
  if (state.notes < GameInfo.MAX_NOTES && state.level < GameInfo.MAX_LEVEL) {
    gameScreen()
    state.level += 1
  } else {
    showScreen(result(state).element);
  }
};

export const showResult = (state) => {

  const Titles = {
  RESULT_SUCCESS: `Вы настоящий меломан!`,
  FAIL_TRIES: `Какая жалость!`,
  FAIL_TIME: `Увы и ах!`
};

const TextButtons = {
  RESULT_SUCCESS: `Сыграть ещё раз`,
  FAIL: `Попробовать ещё раз`
};

const Content = {
  RESULT_SUCCESS: getStatResults(statistics, countScore(state.userAnswersInfo)),
  FAIL: ``,
}

const ResultTotal = {
  RESULT_SUCCESS: `За 3 минуты и 25 секунд вы набрали ${countScore(state.userAnswersInfo, state.notes)} баллов (8 быстрых), совершив ${state.notes} ошибки`,
  FAIL_TIME: `Время вышло! Вы не успели отгадать все мелодии`,
  FAIL_TRIES: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
}
  const data = {}
  if(state.notes >= GameInfo.MAX_NOTES) {
    data.title = Titles.FAIL_TRIES
    data.resultTotal = ResultTotal.FAIL_TRIES
    data.resultText = Content.FAIL
    data.textButton = TextButtons.FAIL
  } else if (state.time === 0) {
    data.title = Titles.FAIL_TIME
    data.resultTotal = ResultTotal.FAIL_TIME
    data.resultText = Content.FAIL
    data.textButton = TextButtons.FAIL
  } else {
    data.title = Titles.RESULT_SUCCESS
    data.resultTotal = ResultTotal.RESULT_SUCCESS
    data.resultText = Content.RESULT_SUCCESS
    data.textButton = TextButtons.RESULT_SUCCESS
  }

  return data;
}
