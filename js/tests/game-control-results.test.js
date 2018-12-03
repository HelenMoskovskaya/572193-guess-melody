/*  import {assert} from 'chai';
import {getResults} from '../game-control.js';


describe(`Get results`, () => {
  it(`if the player won and ranked first place and save 1 note`, () => {
    const statistics = [10, 8, 6, 1, 5];
    const playerResults = {
      notes: 1,
      time: 20,
      score: 15,
    };
    assert.equal(getResults(statistics, playerResults), `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`);
  });
  it(`if the player ranked last place and save 2 notes`, () => {
    const statistics = [10, 8, 6, 4, 5, 9];
    const playerResults = {
      notes: 2,
      time: 20,
      score: 3,
    };
    assert.equal(getResults(statistics, playerResults), `Вы заняли 7 место из 7 игроков. Это лучше, чем у 0% игроков`);
  });
  it(`if the player save 0 notes`, () => {
    const statistics = [10, 8, 5, 9];
    const playerResults = {
      notes: 0,
      time: 20,
      score: 3,
    };
    assert.equal(getResults(statistics, playerResults), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
  it(`if the player has run out of time`, () => {
    const statistics = [10, 8, 5, 9];
    const playerResults = {
      notes: 2,
      time: 0,
      score: 3,
    };
    assert.equal(getResults(statistics, playerResults), `Время вышло! Вы не успели отгадать все мелодии`);
  });
});
*/

