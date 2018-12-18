import {assert} from 'chai';
import {getUserScore} from '../utils';


describe(`Count score`, () => {
  it(`player answered  10 questions fast and don't made mistakes`, () => {
    const answers = [2, 3, 15, 20, 3, 20, 16, 28, 29, 11];
    assert.equal(getUserScore(answers), 20);
  });
  it(`player answered  8 questions fast and made 2 mistake`, () => {
    const answers = [2, 3, 15, 20, 3, -1, 16, -1, 29, 11];
    assert.equal(getUserScore(answers), 12);
  });
  it(`player answered  10 questions nofast`, () => {
    const answers = [45, 30, 55, 49, 34, 59, 32, 32, 39, 31];
    assert.equal(getUserScore(answers), 10);
  });
});
