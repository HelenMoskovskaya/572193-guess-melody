export const INITIAL_GAME = Object.freeze({
  level: 0,
  notes: 3,
  time: 300,
  score: 0,
});

const COUNT_RULES = {
  right: 1,
  wrong: -2,
  fastRight: 2
};

const MAX_LEVEL = 10;
const FAST_TIME = 30;
const FAIL_RESULT = -1;

export const countScore = (answers, notesLast) => {
  let score = INITIAL_GAME.score;

  for (let answer of answers) {
    if (answer.option && answer.time < FAST_TIME) {
      score += COUNT_RULES.fastRight;
    } else if (answer.option !== true) {
      score += COUNT_RULES.wrong;
    } else {
      score += COUNT_RULES.right;
    }
  }

  if (answers.length < MAX_LEVEL) {
    return FAIL_RESULT;
  } else if (notesLast < 0) {
    return FAIL_RESULT;
  } else {
    return score
  }
};


export const countNotes = (answers) => {
  let notes = INITIAL_GAME.notes;
  for (let answer of answers) {
    if (answer.option !== true) {
      notes -= 1;
    }
  }
  return notes
};


export const getResults = (statistics, playerResults) => {
  statistics.push(playerResults.score);
  statistics.sort((a,b) => b - a);
  const place = statistics.indexOf(playerResults.score) + 1;
  const allPlaces = statistics.length;
  const successRate = Math.round((allPlaces - place) / allPlaces * 100);

  if (playerResults.time <= 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`
  }
  if (playerResults.notes <= 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
  }
  return `Вы заняли ${place} место из ${allPlaces} игроков. Это лучше, чем у ${successRate}% игроков`
};


export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }
  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};

