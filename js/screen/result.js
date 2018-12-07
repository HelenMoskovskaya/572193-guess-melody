import ResultView from '../view/result-view';
import {showScreen, clearArray} from '../utils';
import {startGame, gameStates} from '../game-control';

export default () => {
  const result = new ResultView(gameStates);

  result.onBack = () => {
    clearArray(gameStates.userAnswersInfo);
    startGame();
  };
  showScreen(result.element);

  return result;
};
