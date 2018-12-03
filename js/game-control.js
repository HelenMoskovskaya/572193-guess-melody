import {showScreen} from './utils.js';
import {gameLevels} from './game-data.js';
import {initialState} from './game-data.js';
import initFailTriesScreen from './templates/fail-tries.js'
import initFailTimeScreen from './templates/fail-tries.js'
import initGameGenreScreen from './templates/game-genre.js'
import initGameArtistScreen from './templates/game-artist.js'
import initResultSuccessScreen from './templates/result-success.js'


const initialInfo = Object.freeze({
  NOTES: 3,
  TIME: 300,
  SCORE: 0,
});

const countRules = {
  RIGHT: 1,
  WRONG: -2,
  FAST_RIGHT: 2
};

const MAX_LEVEL = 10;
const FAST_TIME = 30;
const FAIL_RESULT = -1;

export const countScore = (answers) => {
  let score = initialInfo.SCORE;

  for (let answer of answers) {
    if (answer.option && answer.time < FAST_TIME) {
      score += countRules.FAST_RIGHT;
    } else if (answer.option !== true) {
      score += countRules.WRONG;
    } else {
      score += countRules.RIGHT;
    }
  }
  return score
};

export const countTime = (answers) => {
  let time = initialInfo.TIME;
  for (let answer of answers) {
    time -= answer.time
  }
  if (time <= 0) {
    return FAIL_RESULT
  }
  return time
};

export const getResults = (statistics) => {
  const gameScore = countScore(userAnswersInfo);
  statistics.push(gameScore);
  statistics.sort((a,b) => b - a);
  const place = statistics.indexOf(gameScore) + 1;
  const allPlaces = statistics.length;
  const successRate = Math.round((allPlaces - place) / allPlaces * 100);

  return `Вы заняли ${place} место из ${allPlaces} игроков. Это лучше, чем у ${successRate}% игроков`
};


export const gameStates = Object.assign({}, initialState);
export const statistics = [1, 4, 3, 12, 6];
export const userAnswersInfo = [];

export const goNextLevel = (state) => {
  const currentLevel = state.level + 1;
  state.level = currentLevel;
  return currentLevel;
};

export const resetLevel = (state) => {
  state.level = initialState.level;
  state.notes = initialState.notes;
  state.time = initialState.time;
  return state
};

export const changeLevel = () => {
  if (gameStates.notes < 3 && gameStates.level < 9) {
    let gameEl = gameLevels[gameStates.level];
    let screen;
    if (gameEl.type === `game--genre`) {
      screen = initGameGenreScreen(gameEl)
    } else if (gameEl.type === `game--artist`) {
      screen = initGameArtistScreen(gameEl)
    }
    showScreen(screen);
    goNextLevel(gameStates);
  } else {
    showResults()
  }
};


export const showResults = () => {
  if (gameStates.notes >= 2) {
    showScreen(initFailTriesScreen());
    resetLevel(gameStates);
  } else if (gameStates.time === 0) {
    showScreen(initFailTimeScreen());
    resetLevel(gameStates);
  } else {
    showScreen(initResultSuccessScreen(gameStates));
  }
};
