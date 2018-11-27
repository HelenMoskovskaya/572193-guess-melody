import {assert} from 'chai';
import {INITIAL_GAME, changeLevel} from '../game-data.js';

describe(`Check level changer`, () => {
  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 5).level, 5);
    assert.equal(changeLevel(INITIAL_GAME, 3).level, 3);
    assert.equal(changeLevel(INITIAL_GAME, 45).level, 45);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, /Level should not be negative value/);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, /Level should be of type number/);
  });
});
