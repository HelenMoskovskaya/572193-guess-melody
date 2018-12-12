import ResultView from '../view/result-view';
import Application from '../application';


export default class ResultScreen {
  constructor(state) {
    this.state = state;
    this.screen = new ResultView(this.state);
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.onBack = () => Application.showGame();
  }

}
