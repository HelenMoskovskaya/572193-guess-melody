import WelcomeView from '../view/welcome-view';
import Application from '../application';


export default class WelcomeScreen {
  constructor() {
    this.screen = new WelcomeView();
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.onClick = () => Application.showGame();
  }

}
