export const ONE_SECOND = 1000;
export const SECONDS_IN_MINUTES = 60;

export const GameInfo = {
  MAX_NOTES: 3,
  TIME: 300,
  START_SCORE: 0,
  MAX_LEVEL: 10,
  FAIL_RESULT: -1
};

export const CountRules = {
  RIGHT: 1,
  WRONG: -2,
  FAST_RIGHT: 2,
  FAST_TIME: 30
};

export const Dictionary = {
  MINUTES: [`минуту`, `минуты`, `минут`],
  SECONDS: [`секунду`, `секунды`, `секунд`],
  POINTS: [`балл`, `балла`, `баллов`],
  FAST_ANSWERS: [`быстрый`, `быстрых`, `быстрых`],
  MISTAKES: [`ошибку`, `ошибки`, `ошибок`],
};

export const ContentButtonModal = {
  YES: `Ок`,
  NO: `Отмена`
};

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

export const countScore = (item) => {
  if (item < 0) {
    return CountRules.WRONG;
  } else if (item < CountRules.FAST_TIME) {
    return CountRules.FAST_RIGHT;
  }
  return CountRules.RIGHT;
};

export const getUserScore = (arr) => {
  const userAnswers = arr.map((it) => countScore(it));

  const userScore = userAnswers.reduce((sum, current) => {
    return sum + current;
  }, 0);

  return userScore;
};

export const getStatResults = (data) => {
  const allStatUsers = data;
  const lastData = allStatUsers[allStatUsers.length - 1];


  allStatUsers.forEach((it) => {
    it.score = getUserScore(it.answers);
  });

  const getSort = (a, b) => {
    if (a.score === b.score) {
      return (a.time - b.time);
    }
    return (b.score - a.score);
  };

  const statPoints = allStatUsers.sort(getSort);

  const place = statPoints.indexOf(lastData) + 1;
  const allPlaces = statPoints.length;
  const successRate = Math.round((allPlaces - place) / allPlaces * 100);

  return `Вы заняли ${place} место из ${allPlaces} игроков. Это лучше, чем у ${successRate}% игроков`;
};


export const showFailResult = (state) => {
  const FailTries = {
    title: `Какая жалость!`,
    resultTotal: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  };

  const FailTime = {
    title: `Увы и ах!`,
    resultTotal: `Время вышло! Вы не успели отгадать все мелодии`,
  };

  if (state.notes >= GameInfo.MAX_NOTES) {
    return FailTries;
  } else if (state.time <= 0) {
    return FailTime;
  }
  return null;
};

export const formatWords = (n, numeralArr) => {
  const keys = [2, 0, 1, 1, 1, 2];
  return numeralArr[(n % 100 > 4 && n % 100 < 20) ? 2 : keys[(n % 10 < 5) ? n % 10 : 5]];
};
