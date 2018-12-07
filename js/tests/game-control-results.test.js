import {assert} from 'chai';
import {getStatResults} from '../game-control.js';


describe(`Get results`, () => {
  it(`if the player won and ranked first place`, () => {
    const statistics = [10, 8, 6, 1, 5];
    const score = 15;
    assert.equal(getStatResults(statistics, score), `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`);
  });
  it(`if the player won and ranked last place`, () => {
    const statistics = [10, 8, 6, 1, 5];
    const score = 0;
    assert.equal(getStatResults(statistics, score), `Вы заняли 6 место из 6 игроков. Это лучше, чем у 0% игроков`);
  });
});

