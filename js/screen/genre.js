import GameGenreView from '../view/genre-view';
import {gameLevels} from '../data';
import {gameStates, changeLevel} from '../game-control';

export default () => {
  const genreScreen = new GameGenreView(gameLevels[gameStates.level]);
  const inputGenreElement = genreScreen.element.querySelectorAll(`.game__input`);
  const correctAnswer = gameLevels[gameStates.level].answers;
  const answerEls = [...inputGenreElement];

  genreScreen.initSetting();
  genreScreen.playAudio();

  genreScreen.onAnswer = () =>{
    const userAnswers = answerEls.filter((it) => it.checked);
    const result = userAnswers.every((it) => {
      return it.value === correctAnswer;
    });

    gameStates.userAnswersInfo.push({
      option: result
    });

    if (result !== true) {
      gameStates.notes += 1;
    }

    changeLevel(gameStates);
  };

  return genreScreen;
};

