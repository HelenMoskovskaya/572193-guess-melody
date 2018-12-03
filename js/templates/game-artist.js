import {renderElement} from '../utils.js';
import initHeader from './header.js';
import {changeLevel, gameStates, userAnswersInfo} from '../game-control.js';
import {gameLevels} from '../game-data.js';


const gameArtistScreenTemplate = (game) => `
  <section class="game game--artist">

    <section class="game__screen">
      <h2 class="game__title">${game.title}</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio src="${game.question.src}"></audio>
      </div>
      <form class="game__artist">
        ${game.answers.map((it) =>`
        <div class="artist">
          <input class="artist__input visually-hidden" type="radio" name="answer" value="${it.artist}" id="answer-${it.src}">
          <label class="artist__name" for="answer-${it.src}">
            <img class="artist__picture" src="${it.image}" alt="${it.artist}">
            ${it.artist}
          </label>
        </div>
        `).join(``)}
      </form>
    </section>
  </section>
  `;

const initGameArtistScreen = (game) => {
  const gameArtistScreenElement = renderElement(gameArtistScreenTemplate(game));
  const inputArtistElement = gameArtistScreenElement.querySelectorAll(`.artist__input`);
  const gameArtistBlockElement = gameArtistScreenElement.querySelector(`.game`);
  const trackArtistBtnElement = gameArtistScreenElement.querySelector(`.track__button`);
  const audioTrackArtistElement = gameArtistScreenElement.querySelector(`audio`);

  gameArtistBlockElement.insertAdjacentElement(`afterbegin`, initHeader());

  const toPlayGameArtist = () => {
    audioTrackArtistElement.setAttribute(`autoplay`, true);
    trackArtistBtnElement.classList.add(`track__button--pause`);

    const playMusic = () => {
      if (trackArtistBtnElement.classList.contains(`track__button--pause`)) {
        trackArtistBtnElement.classList.remove(`track__button--pause`);
        audioTrackArtistElement.pause();
      } else {
        trackArtistBtnElement.classList.add(`track__button--pause`);
        audioTrackArtistElement.play();
      }
    };
    trackArtistBtnElement.addEventListener(`click`, playMusic);
  };

  const correctAnswer = gameLevels[gameStates.level].question.artist;

  const onUnputArtistClick = () => {
    const answerEls = [...inputArtistElement];
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

  toPlayGameArtist();

  inputArtistElement.forEach((it) => {
    it.addEventListener(`click`, onUnputArtistClick);
  });
  return gameArtistScreenElement;
};


export default initGameArtistScreen;
