import {showScreen, GameInfo} from './utils';
import WelcomeScreen from './presenter/welcome-presenter';
import GameScreen from './presenter/game-screen-presenter';
import GameModel from './model/game-model';
import ResultSuccessScreen from './presenter/result-success-presenter';
import ErrorView from './view/error-view';
import Loader from './loader';
import {INITIAL_STATE} from './data';
import ResultFailScreen from './presenter/result-fail-presenter';


let gameData;
let allStatisticsData;

export default class Application {
  static start() {
    const welcomeScreen = new WelcomeScreen();
    showScreen(welcomeScreen.element);
    welcomeScreen.startPreloader();
    Loader.loadData().
      then((data) => {
        return gameData = data;
      }).
      catch(Application.showError).
      then(() => welcomeScreen.stopPreloader());
  }

  static showGame() {
    const model = new GameModel(gameData);
    const gameScreen = new GameScreen(model);
    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showResult(state) {
    const userData = {
      time: INITIAL_STATE.time - state.time,
      answers: state.userAnswersInfo,
    };

    if (state.notes < GameInfo.MAX_NOTES && state.time > 0) {
      Loader.saveResults(userData).
        then(() => Loader.loadResults()).
        then((data) => {
          return allStatisticsData = data;
        }).
        then(() => console.log(allStatisticsData)).
        then(() => {
          const resultSuccessScreen = new ResultSuccessScreen(state, allStatisticsData);
          showScreen(resultSuccessScreen.element);
        });
    } else {
        const resultFailScreen = new ResultFailScreen(state);
        showScreen(resultFailScreen.element)
    };
  }

  static showError(error) {
    const errorScreen = new ErrorView(error);
    errorScreen.showModal()
  }
}

