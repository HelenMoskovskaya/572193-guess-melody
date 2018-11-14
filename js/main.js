'use strict';

const ArrowDirection = {
  RIGHT_ARROW: 39,
  LEFT_ARROW: 37,
};

const ButtonContent = {
  RIGHT_CONTENT: `->`,
  LEFT_CONTENT: `<-`,
};

const activeScreenElement = document.querySelector(`.main`);
const appBlockElement = document.querySelector(`.app`);
const welcomeScreenElement = document.getElementById(`welcome`);
const gameArtistScreenElement = document.getElementById(`game-artist`);
const gameGenreScreenElement = document.getElementById(`game-genre`);
const resultSuccessScreenElement = document.getElementById(`result-success`);
const failTimeScreenElement = document.getElementById(`fail-time`);
const failTriesScreenElement = document.getElementById(`fail-tries`);

const screens = [
  welcomeScreenElement,
  gameArtistScreenElement,
  gameGenreScreenElement,
  resultSuccessScreenElement,
  failTimeScreenElement,
  failTriesScreenElement
];

const arrowsBlockElement = document.createElement(`div`);
arrowsBlockElement.classList.add(`arrows__wrap`);
arrowsBlockElement.innerHTML =
 `<style>
    .arrows__wrap {
      position: absolute;
      top: 135px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
      background: yellow;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>`;
appBlockElement.appendChild(arrowsBlockElement);

const showScreen = (n) => {
  activeScreenElement.innerHTML = ``;
  activeScreenElement.appendChild(screens[n].content.cloneNode(true));
};

let currentScreen = 0;

const showNextScreen = () => {
  currentScreen = currentScreen + 1;
  currentScreen = (currentScreen === screens.length) ? (screens.length - 1) : currentScreen;
  showScreen(currentScreen);
};

const showPreviousScreen = () => {
  currentScreen = currentScreen - 1;
  currentScreen = (currentScreen < 0) ? (currentScreen = 0) : currentScreen;
  showScreen(currentScreen);
};

const onSelectScreenKeyDown = (evt) => {
  switch (evt.keyCode) {
    case ArrowDirection.RIGHT_ARROW:
      showNextScreen();
      break;
    case ArrowDirection.LEFT_ARROW:
      showPreviousScreen();
      break;
  }
};

const onSelectScreenClick = (evt) => {
  const activeButton = evt.target;
  switch (activeButton.textContent) {
    case ButtonContent.RIGHT_CONTENT:
      showNextScreen();
      break;
    case ButtonContent.LEFT_CONTENT:
      showPreviousScreen();
      break;
  }
};

showScreen(currentScreen);
arrowsBlockElement.querySelectorAll(`.arrows__btn`).forEach((button) => {
  button.addEventListener(`click`, onSelectScreenClick);
});
document.addEventListener(`keydown`, onSelectScreenKeyDown);
