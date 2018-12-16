import {showScreen} from './utils';
import WelcomeScreen from './presenter/welcome-presenter';
import GameScreen from './presenter/game-screen-presenter';
import GameModel from './model/game-model';
import ResultScreen from './presenter/result-presenter';
import LoaderScreen from './presenter/loader-presenter';
import ErrorScreen from './presenter/error-presenter';


const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let gameData;

export default class Application {
  static start() {
    const loaderScreen = new LoaderScreen();
    showScreen(loaderScreen.element);
    loaderScreen.initSetting()
    loaderScreen.start()
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => gameData = data).
      then((response) => Application.showWelcome()).
      catch(Application.showError).
      then(() => loaderScreen.stop());
  }

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    showScreen(welcomeScreen.element);

    console.log(gameData)
    console.log(gameData[0].genre)
  }

  static showGame() {
    const model = new GameModel(gameData);
    const gameScreen = new GameScreen(model);

    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showResult(state) {
    const resultScreen = new ResultScreen(state);
    showScreen(resultScreen.element);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    showScreen(errorScreen.element);
  }
}

