import {assert} from 'chai';
import {countScore} from '../utils';


describe(`Count score`, () => {
  it(`player answered less than 10 questions`, () => {
    const answers = [];
    const state = {notes: 0};
    assert.equal(countScore(answers, state.notes), -1);
  });
  it(`player answered 10 questions not fast`, () => {
    const state = {notes: 0};
    const answers =
    [{option: true, time: 45},
      {option: true, time: 34},
      {option: true, time: 50},
      {option: true, time: 52},
      {option: true, time: 36},
      {option: true, time: 39},
      {option: true, time: 45},
      {option: true, time: 48},
      {option: true, time: 55},
      {option: true, time: 57},
    ];
    assert.equal(countScore(answers, state.notes), 10);
  });
  it(`player answered 10 questions, 5 of them quickly`, () => {
    const state = {notes: 0};
    const answers =
    [{option: true, time: 25},
      {option: true, time: 14},
      {option: true, time: 10},
      {option: true, time: 52},
      {option: true, time: 36},
      {option: true, time: 29},
      {option: true, time: 45},
      {option: true, time: 48},
      {option: true, time: 15},
      {option: true, time: 57},
    ];
    assert.equal(countScore(answers, state.notes), 15);
  });
  it(`player answered 8 questions, 2 of them quickly, and made 2 mistakes`, () => {
    const state = {notes: 2};
    const answers =
    [{option: true, time: 25},
      {option: false, time: 10},
      {option: true, time: 10},
      {option: true, time: 52},
      {option: false, time: 57},
      {option: true, time: 39},
      {option: true, time: 15},
      {option: true, time: 48},
      {option: true, time: 55},
      {option: true, time: 57},
    ];
    assert.equal(countScore(answers, state.notes), 7);
  });
  it(`player answered 10 questions fast`, () => {
    const state = {notes: 0};
    const answers =
    [{option: true, time: 25},
      {option: true, time: 14},
      {option: true, time: 10},
      {option: true, time: 12},
      {option: true, time: 3},
      {option: true, time: 29},
      {option: true, time: 5},
      {option: true, time: 28},
      {option: true, time: 15},
      {option: true, time: 27},
    ];
    assert.equal(countScore(answers, state.notes), 20);
  });
  it(`player answered 8 questions fast and made 3 mistakes`, () => {
    const state = {notes: 3};
    const answers =
    [{option: true, time: 25},
      {option: true, time: 14},
      {option: false, time: 30},
      {option: true, time: 12},
      {option: true, time: 3},
      {option: false, time: 29},
      {option: true, time: 5},
      {option: true, time: 28},
      {option: true, time: 15},
      {option: false, time: 46},
    ];
    assert.equal(countScore(answers, state.notes), -1);
  });
});
