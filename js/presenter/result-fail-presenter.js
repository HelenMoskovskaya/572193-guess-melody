import ResultFailView from '../view/result-fail-view';
import Application from '../application';


export default class ResultFailScreen {
  constructor(state) {
    this.state = state;
    this.screen = new ResultFailView(this.state);
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.onBack = () => Application.showGame();
  }

}
