import {renderElement} from '../utils.js';
import {gameLevels} from '../game-data.js';
import initHeader from './header.js';
import {changeLevel, gameStates, userAnswersInfo} from '../game-control.js';

const gameGenreScreenTemplate = (game) => `
  <section class="game game--genre">

    <section class="game__screen">
      <h2 class="game__title">${game.title}</h2>
      <form class="game__tracks">
        ${game.questions.map((it) =>
    `<div class="track">
          <button class="track__button track__button--play" type="button"></button>
          <div class="track__status">
            <audio src="${it.src}"></audio>
          </div>
          <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="${it.genre}" id="answer-${it.src}">
            <label class="game__check" for="answer-${it.src}">Отметить</label>
          </div>
        </div>
        `).join(``)}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>
  `;

const initGameGenreScreen = (game) => {
  const gameGenreScreenElement = renderElement(gameGenreScreenTemplate(game));
  const gameGenreSubmitBtnElement = gameGenreScreenElement.querySelector(`.game__submit`);
  const inputGenreElement = gameGenreScreenElement.querySelectorAll(`.game__input`);
  const gameGenreBlockElement = gameGenreScreenElement.querySelector(`.game`);
  const formGenreElement = gameGenreScreenElement.querySelector(`.game__tracks`);

  gameGenreBlockElement.insertAdjacentElement(`afterbegin`, initHeader());

  const toPlayGameGenre = () => {
    const trackGenreBtnElement = formGenreElement.querySelectorAll(`.track__button`);
    const audioTrackGenreElement = formGenreElement.querySelectorAll(`audio`);
    const playButtons = [...trackGenreBtnElement];
    const audioTracks = [...audioTrackGenreElement];

    audioTracks[0].setAttribute(`autoplay`, true);
    playButtons[0].classList.add(`track__button--pause`);

    playButtons.forEach((button, i) => {
      button.addEventListener(`click`, () => {
        if (button.classList.contains(`track__button--pause`)) {
          audioTracks[i].pause();
          button.classList.remove(`track__button--pause`);
        } else {
          for (let j = 0; j < playButtons.length; j++) {
            playButtons[j].classList.remove(`track__button--pause`);
            audioTracks[j].pause();
          }
          button.classList.add(`track__button--pause`);
          audioTracks[i].play();
        }
      });
    });
  };

  gameGenreSubmitBtnElement.setAttribute(`disabled`, true);

  const answerEls = [...inputGenreElement];

  inputGenreElement.forEach((element) => {
    element.addEventListener(`click`, () => {
      gameGenreSubmitBtnElement.removeAttribute(`disabled`);
    });
  });

  const correctAnswer = gameLevels[gameStates.level].answers;


  const onGameSubmitClick = () => {
    const userAnswers = answerEls.filter((it) => it.checked);
    const result = userAnswers.every((it) => {
      return it.value === correctAnswer;
    });

    userAnswersInfo.push({
      option: result
    });

    if (result !== true) {
      gameStates.notes += 1;
    }

    changeLevel();


  };

  toPlayGameGenre();
  gameGenreSubmitBtnElement.addEventListener(`click`, onGameSubmitClick);
  return gameGenreScreenElement;
};

export default initGameGenreScreen;
