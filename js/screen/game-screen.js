import GameScreenView from '../view/game-screen-view';
import {gameLevels} from '../data';
import {gameStates} from '../game-control';
import {showScreen} from '../utils';
import header from '../screen/header';
import genreScreen from '../screen/genre';
import artistScreen from '../screen/artist';


export default () => {
  const gameScreen = new GameScreenView(gameLevels[gameStates.level]);
  const gameBlockElement = gameScreen.element.querySelector(`.game__screen`);

  const gameElement = gameLevels[gameStates.level];
  const screen = (gameElement.type === `game--genre`) ? genreScreen(gameElement).element : artistScreen(gameElement).element;

  gameScreen.element.insertAdjacentElement(`afterbegin`, header().element);
  gameBlockElement.insertAdjacentElement(`beforeend`, screen);

  showScreen(gameScreen.element);

  return gameScreen;
};

