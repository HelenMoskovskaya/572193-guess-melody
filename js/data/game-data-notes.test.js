import {assert} from 'chai';
import {countNotes} from '../game-data.js';


describe(`Count notes`, () => {
  it(`player made 0 mistakes`, () => {
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
    assert.equal(countNotes(answers), 3);
  });
  it(`player made 3 mistakes`, () => {
    const answers =
    [{option: true, time: 45},
      {option: false, time: 34},
      {option: true, time: 50},
      {option: true, time: 52},
      {option: true, time: 36},
      {option: false, time: 39},
      {option: true, time: 45},
      {option: true, time: 48},
      {option: true, time: 55},
      {option: false, time: 57},
    ];
    assert.equal(countNotes(answers), 0);
  });
  it(`player made more then 3 mistakes`, () => {
    const answers =
    [{option: true, time: 45},
      {option: false, time: 34},
      {option: true, time: 50},
      {option: true, time: 52},
      {option: true, time: 36},
      {option: false, time: 39},
      {option: true, time: 45},
      {option: true, time: 48},
      {option: false, time: 55},
      {option: false, time: 57},
    ];
    assert.equal(countNotes(answers), -1);
  });
});
