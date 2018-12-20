import AbstractView from './abstract-view';

export default class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
  <section>
    <h2 class="modal__title">Произошла ошибка!</h2>
    <p class="modal__text">Статус: ${this.error} Пожалуйста, перезагрузите страницу.</p>
  </section>`;
  }

  showModal() {
    document.body.appendChild(this.element);
    this.element.classList.add(`modal`);
  }
}
