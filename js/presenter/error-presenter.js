import ErrorView from '../view/error-view';

const myError = new Error(`Что-то пошло не так =(`);


export default class ErrorScreen {
  constructor() {
    this.screen = new ErrorView(myError);
  }

  get element() {
    return this.screen.element;
  }
}
