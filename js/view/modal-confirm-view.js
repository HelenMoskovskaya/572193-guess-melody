import AbstractView from './abstract-view';
import {ContentButtonModal} from '../utils';

export default class ModalConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
  <section>
    <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
    <h2 class="modal__title">Подтверждение</h2>
    <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
    <div class="modal__buttons">
      <button class="modal__button button">${ContentButtonModal.YES}</button>
      <button class="modal__button button">${ContentButtonModal.NO}</button>
    </div>
  </section>
  `;
  }

  showModalConfirm() {
    document.body.appendChild(this.element);
    this.element.classList.add(`modal`);
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

}
