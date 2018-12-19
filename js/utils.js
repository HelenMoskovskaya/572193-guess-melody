 import {statistics, INITIAL_STATE} from './data'


/*export const renderElement = (template) => {
    const parser = new DOMParser();
    const result = parser.parseFromString(template, `text/html`);

    return result.body.firstElementChild;
  }
const appContainer = document.getElementById(`.main`);

export const showScreen = (screen) => {
  appContainer.replaceChild(screen.element, appContainer.children[0])
}*/
//export const renderElement = (template) => new DOMParser().parseFromString(template, `text/html`).body.firstElementChild;

/*export const renderElement = (template) => {
    const parser = new DOMParser();
    const result = parser.parseFromString(template, `text/html`);

    return result.body.firstElementChild;
  }*/


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
export const SECONDS_IN_MINUTES = 60;

const countRules = {
  RIGHT: 1,
  WRONG: -2,
  FAST_RIGHT: 2,
  FAST_TIME: 30
};


export const ContentButtonModal = {
  YES: `Ок`,
  NO: `Отмена`
}

export const countScore = (item) => {
  let score = GameInfo.START_SCORE;

  if(item < 0) {
    score += countRules.WRONG;
  } else if (item < countRules.FAST_TIME) {
    score += countRules.FAST_RIGHT;
  } else {
    score += countRules.RIGHT
  }

  return score
};


export const getUserScore = (arr) => {
  const userAnswers = arr.map((it) => it);
  const userTime = userAnswers.map((it) => it = countScore(it));
  const userScore = userTime.reduce((sum, current) => {
    return sum + current}, 0);

  return userScore
}

export const getStatResults = (data) => {
  const allStatUsers = data;
  const lastData = allStatUsers[allStatUsers.length - 1];

  allStatUsers.forEach((it) => {
    it.score = it.answers.map((it) => it = countScore(it));
    it.score = it.score.reduce((sum, current) => sum + current);
  });

  const getSort = (a,b) => {
    if (a.score === b.score) {
      return (a.time - b.time)
    } else {
      return (b.score - a.score)
    }
  }

  const statPoints = allStatUsers.sort(getSort);

  const place = statPoints.indexOf(lastData) + 1;
  const allPlaces = statPoints.length;
  console.log(statPoints)
  const successRate = Math.round((allPlaces - place) / allPlaces * 100);

  return `Вы заняли ${place} место из ${allPlaces} игроков. Это лучше, чем у ${successRate}% игроков`
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

  let content = {}

  if(state.notes >= GameInfo.MAX_NOTES) {
    content = FailTries
  } else if (state.time <= 0) {
    content = FailTime
  }
  return content;
}

export const Dictionary = {
  MINUTES: [`минуту`, `минуты`, `минут`],
  SECONDS: [`секунду`, `секунды`, `секунд`],
  POINTS: [`балл`, `балла`, `баллов`],
  FAST_ANSWERS: [`быстрый`, `быстрых`, `быстрых`],
  MISTAKES: [`ошибку`, `ошибки`, `ошибок`],
  };

 export const formatWords = (n, numeralArr) => {
  const key = [2, 0, 1, 1, 1, 2];
  return numeralArr[(n % 100 > 4 && n % 100 < 20) ? 2 : key[(n % 10 < 5) ? n % 10 : 5]];
};

export const initSettingGenre = (element, button, input) => {
    element.querySelector(button).setAttribute(`disabled`, true);
    element.querySelectorAll(input).forEach((it) => {
      it.addEventListener(`click`, () => {
        element.querySelector(button).removeAttribute(`disabled`);
      });
    });
  }
