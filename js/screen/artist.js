import GameAtistView from '../view/artist-view';
import {gameLevels} from '../data';
import {gameStates, changeLevel} from '../game-control';


export default () => {
  const artistScreen = new GameAtistView(gameLevels[gameStates.level]);
  const correctAnswer = gameLevels[gameStates.level].question.artist;

  artistScreen.playAudio();

  artistScreen.onAnswer = () =>{
    const inputArtistElement = artistScreen.element.querySelectorAll(`.artist__input`);
    const answerEls = [...inputArtistElement];
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

  return artistScreen;
};

