import ResultSuccessView from '../view/result-success-view';
import Application from '../application';


export default class ResultSuccessScreen {
  constructor(state, data) {
    this.state = state;
    this.data = data;
    this.screen = new ResultSuccessView(this.state, data);
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.onBack = () => Application.showGameReplay();
  }

}
