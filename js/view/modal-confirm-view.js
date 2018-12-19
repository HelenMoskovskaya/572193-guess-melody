import AbstractView from './abstract-view';

export default class ModalConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
  <section class="modal">
    <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
    <h2 class="modal__title">Подтверждение</h2>
    <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
    <div class="modal__buttons">
      <button class="modal__button button">Ок</button>
      <button class="modal__button button">Отмена</button>
    </div>
  </section>`;
  }

  bind() {
    const modalButtonElement = this.element.querySelectorAll(`.modal__button`);
    const closeButtonElement = this.element.querySelector(`.modal__close`);

    const onButtonModalClick = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      this.onConfirmClick(evt);
    };

    const onButtonCloseClick = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      this.onCloseClick();
    };


    modalButtonElement.forEach((button) => {
      button.addEventListener(`click`, onButtonModalClick);
    });

    closeButtonElement.addEventListener(`click`, onButtonCloseClick);
  }

  onConfirmClick() {

  }

  onCloseClick() {

  }

  showModalConfirm() {
    document.body.appendChild(this.element);
  }

}
