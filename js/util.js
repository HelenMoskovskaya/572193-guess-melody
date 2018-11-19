import showScreen from './action/show-screen.js';
import gameGenreScreenElement from './screens/game-genre.js';
import welcomeScreen from './screens/welcome.js';


export const onBackButtonClick = () => {
  showScreen(gameGenreScreenElement);
};


export const onGameLogoClick = () => {
  showScreen(welcomeScreen);
};
