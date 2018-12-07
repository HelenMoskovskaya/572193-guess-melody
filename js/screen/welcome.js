import WelcomeView from '../view/welcome-view';
import {showScreen} from '../utils';
import {startGame} from '../game-control';

export default () => {
  const welcomeScreen = new WelcomeView();


  welcomeScreen.onClick = () => {
    startGame();
  };

  showScreen(welcomeScreen.element);

  return welcomeScreen;
};

