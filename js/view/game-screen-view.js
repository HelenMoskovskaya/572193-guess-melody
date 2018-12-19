import AbstractView from './abstract-view';


export default class GameScreenView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
  <section class="game game--${this.level.type}">
    <section class="game__screen">
    </section>
  </section>`;
  }
}
