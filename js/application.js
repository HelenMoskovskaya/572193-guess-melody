import {showScreen, GameInfo} from './utils';
import WelcomeScreen from './presenter/welcome-presenter';
import GameScreen from './presenter/game-screen-presenter';
import GameModel from './model/game-model';
import ResultSuccessScreen from './presenter/result-success-presenter';
import LoaderScreen from './presenter/loader-presenter';
import ErrorScreen from './presenter/error-presenter';
import Loader from './loader';
import {INITIAL_STATE} from './data';
import ResultFailScreen from './presenter/result-fail-presenter';

let gameData;
let allStatisticsData;

export default class Application {
  static start() {
    const loaderScreen = new LoaderScreen();
    showScreen(loaderScreen.element);
    loaderScreen.initSetting()
    loaderScreen.start()
    Loader.loadData().
      then((data) => gameData = data).
      then((gameData) => Application.showWelcome()).

      catch(Application.showError).
      then(() => loaderScreen.stop());
  }

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    showScreen(welcomeScreen.element);

    console.log(gameData)
    console.log(gameData.length)

    console.log(gameData[0].genre)
  }

  static showGame() {
    const model = new GameModel(gameData);
    const gameScreen = new GameScreen(model);

    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showGameReplay() {

    Loader.loadData().
      then((data) => gameData = data).
      then((gameData) => Application.showGame()).

      catch(Application.showError)
      //then(() => loaderScreen.stop());
  }

  static showResult(state) {
    const userData = {
      time: INITIAL_STATE.time - state.time,
      answers: state.userAnswersInfo.map((it) => it.time),
    }

    if(state.notes < GameInfo.MAX_NOTES && state.time > 0) {
      Loader.saveResults(userData).
        then(() => Loader.loadResults()).
        then((data) => allStatisticsData = data).
        then(() => console.log(allStatisticsData)).
        then(() => {
          const resultSuccessScreen = new ResultSuccessScreen(state, allStatisticsData);
          showScreen(resultSuccessScreen.element)
        });
    } else {
        const resultFailScreen = new ResultFailScreen(state);
        showScreen(resultFailScreen.element)
    }

  }
  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    showScreen(errorScreen.element);
  }
}

