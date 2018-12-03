import {renderElement, clearArray} from '../utils.js';
import {changeLevel, resetLevel, gameStates, userAnswersInfo} from '../game-control.js';


const failTimeScreenTemplate = () =>
  `<section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Увы и ах!</h2>
    <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>
  `;

const initFailTimeScreen = () => {
  const failTimeScreenElement = renderElement(failTimeScreenTemplate);
  const buttonFailTimeElement = failTimeScreenElement.querySelector(`.result__replay`);

  const onBackButtonClick = () => {
    resetLevel(gameStates);
    clearArray(userAnswersInfo);
    changeLevel();
  };

  buttonFailTimeElement.addEventListener(`click`, onBackButtonClick);

  return failTimeScreenElement;
};

export default initFailTimeScreen;
