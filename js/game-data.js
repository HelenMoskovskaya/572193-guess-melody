import trackList from './track-list.js';

export const initialState = Object.freeze({
  level: 0,
  notes: 0,
  time: 300,
});

export const gameLevels = [
  {
    type: `game--genre`,
    title: `Выберите ${trackList[4].genre} треки`,
    id: `1`,
    questions: [trackList[1], trackList[4], trackList[0], trackList[5]],
    answers: `${trackList[4].genre}`
  },
  {
    type: `game--artist`,
    title: `Кто исполняет эту песню?`,
    id: `2`,
    question: trackList[0],
    answers: [trackList[0], trackList[3], trackList[4]],
  },
  {
    type: `game--genre`,
    title: `Выберите ${trackList[3].genre} треки`,
    id: `3`,
    questions: [trackList[0], trackList[4], trackList[3], trackList[5]],
    answers: `${trackList[3].genre}`,
  },
  {
    type: `game--artist`,
    title: `Кто исполняет эту песню?`,
    id: `4`,
    question: trackList[1],
    answers: [trackList[0], trackList[2], trackList[1]],
  },
  {
    type: `game--genre`,
    title: `Выберите ${trackList[2].genre} треки`,
    id: `5`,
    questions: [trackList[0], trackList[1], trackList[4], trackList[2]],
    answers: `${trackList[2].genre}`,
  },
  {
    type: `game--artist`,
    title: `Кто исполняет эту песню?`,
    id: `6`,
    question: trackList[2],
    answers: [trackList[4], trackList[2], trackList[3]],
  },
  {
    type: `game--genre`,
    title: `Выберите ${trackList[1].genre} треки`,
    id: `7`,
    questions: [trackList[2], trackList[3], trackList[1], trackList[0]],
    answers: `${trackList[1].genre}`,
  },
  {
    type: `game--artist`,
    title: `Кто исполняет эту песню?`,
    id: `8`,
    question: trackList[3],
    answers: [trackList[1], trackList[0], trackList[3]],
  },
  {
    type: `game--genre`,
    title: `Выберите ${trackList[0].genre} треки`,
    id: `9`,
    questions: [trackList[0], trackList[3], trackList[4], trackList[2]],
    answers: `${trackList[0].genre}`,
  },
  {
    type: `game--artist`,
    title: `Кто исполняет эту песню?`,
    id: `10`,
    question: trackList[4],
    answers: [trackList[2], trackList[4], trackList[0]],
  },
];
