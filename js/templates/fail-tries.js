import {renderElement, clearArray} from '../utils.js';
import {changeLevel, resetLevel, gameStates, userAnswersInfo} from '../game-control.js';

const failTriesScreenTemplate = () =>
  `<section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Какая жалость!</h2>
    <p class="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>
`;

const initFailTriesScreen = () => {
  const failTriesScreenElement = renderElement(failTriesScreenTemplate);
  const buttonFailTriesElement = failTriesScreenElement.querySelector(`.result__replay`);

  const onBackButtonClick = () => {
    resetLevel(gameStates);
    clearArray(userAnswersInfo);
    changeLevel();
  };

  buttonFailTriesElement.addEventListener(`click`, onBackButtonClick);

  return failTriesScreenElement;
};


export default initFailTriesScreen;
