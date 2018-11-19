const activeScreenElement = document.querySelector(`.main`);

const showScreen = (screen) => {
  activeScreenElement.innerHTML = ``;
  activeScreenElement.appendChild(screen);
};


export default showScreen;
