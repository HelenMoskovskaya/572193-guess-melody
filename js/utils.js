 import {statistics} from './data'


 export const renderElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element;
};

export const showScreen = (screen) => {
  const mainContainerElement = document.querySelector(`.main`);
  mainContainerElement.innerHTML = ``;
  mainContainerElement.appendChild(screen);
};

export const clearArray = (arr) => {
  arr.length = 0;
};

export const GameInfo = {
  MAX_NOTES: 3,
  TIME: 300,
  START_SCORE: 0,
  MAX_LEVEL: 10,
  FAIL_RESULT: -1
};

export const ONE_SECOND = 1000;

const countRules = {
  RIGHT: 1,
  WRONG: -2,
  FAST_RIGHT: 2,
  FAST_TIME: 30
};

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

export const showResult = (state) => {
  const resultTime = state.time;
  const minutes = Math.floor(resultTime / 60);
  const seconds = resultTime % 60;

  const fastAnswers = state.userAnswersInfo.filter((it) => it.option === true && it.time < 30);
  const quantityFast = fastAnswers.length;

  const ResultSuccess = {
    title: `Вы настоящий меломан!`,
    textButton: `Сыграть ещё раз`,
    resultTotal: `За ${minutes} ${formatWord(minutes, 'minutes')} и ${seconds} ${formatWord(seconds, 'seconds')} вы набрали ${countScore(state.userAnswersInfo, state.notes)} ${formatWord(countScore(state.userAnswersInfo, state.notes), 'points')} (${quantityFast} ${formatWord(quantityFast, 'fastAnswers')}), совершив ${state.notes} ${formatWord(state.notes, 'mistakes')}`,
    resultText: getStatResults(statistics, countScore(state.userAnswersInfo)),
  };

  const FailTries = {
    title: `Какая жалость!`,
    textButton: `Попробовать ещё раз`,
    resultTotal: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
    resultText: ``
  };

  const FailTime = {
    title: `Увы и ах!`,
    textButton: `Попробовать ещё раз`,
    resultTotal: `Время вышло! Вы не успели отгадать все мелодии`,
    resultText: ``
  };

  let data = {}

  if(state.notes >= GameInfo.MAX_NOTES) {
    data = FailTries
  } else if (state.time <= 0) {
    data = FailTime
  } else {
    data = ResultSuccess
  }

  return data;
}

const Vocabulary = {
  minutes: [`минуту`, `минуты`, `минут`],
  seconds: [`секунду`, `секунды`, `секунд`],
  points: [`балл`, `балла`, `баллов`],
  fastAnswers: [`быстрый`, `быстрых`, `быстрых`],
  mistakes: [`ошибку`, `ошибки`, `ошибок`],
  };

  export const formatWord = (number, item) => {
    const words = Vocabulary[item];
    if ((number === 1) || (number > 20 && number % 10 === 1)) {
      return words[0];
    } else if ((number >= 2 && number <= 4) || (number > 20 && number % 10 >= 2 && number % 10 <= 4)) {
      return words[1];
    } else {
      return words[2];
  }
  };


