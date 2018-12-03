import {renderElement, clearArray} from '../utils.js';
import {changeLevel, resetLevel, gameStates, statistics, getResults, userAnswersInfo, countScore} from '../game-control.js';

const resultSuccessScreenTemplate = (game) =>
  `<section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За 3 минуты и 25 секунд вы набрали ${countScore(userAnswersInfo)} баллов (8 быстрых), совершив ${game.notes} ошибки</p>
    <p class="result__text">${getResults(statistics)}</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>
   </section>`;

const initResultSuccessScreen = (game) => {
  const resultSuccessScreenElement = renderElement(resultSuccessScreenTemplate(game));
  const buttonResultSuccessElement = resultSuccessScreenElement.querySelector(`.result__replay`);

  const onBackButtonClick = () => {
    resetLevel(gameStates);
    clearArray(userAnswersInfo);
    changeLevel();
  };

  buttonResultSuccessElement.addEventListener(`click`, onBackButtonClick);

  return resultSuccessScreenElement;
};

export default initResultSuccessScreen;
