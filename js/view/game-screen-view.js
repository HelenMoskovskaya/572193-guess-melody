import AbstractView from './abstract-view';
import {GAME_LEVELS} from '../data';


export default class GameScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.level = GAME_LEVELS[state.level];
  }

  get template() {
    return `
  <section class="game ${this.level.type}">
    <section class="game__screen">
    </section>
  </section>`;
  }
}
