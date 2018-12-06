import AbstractView from './abstract-view';

export default class GameScreenView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return `
  <section class="game game--genre">
    <section class="game__screen">
      <h2 class="game__title">${this.game.title}</h2>
    </section>
  </section>`;
  }
}
