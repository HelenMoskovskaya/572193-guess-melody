import {showScreen} from './utils';
import WelcomeScreen from './presenter/welcome-presenter';
import GameScreen from './presenter/game-screen-presenter';
import GameModel from './model/game-model';
import ResultScreen from './presenter/result-presenter';

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    showScreen(welcome.element);
  }

  static showGame() {
    const model = new GameModel();
    const gameScreen = new GameScreen(model);

    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showResult(state) {
    const resultScreen = new ResultScreen(state);
    showScreen(resultScreen.element);
  }
}

