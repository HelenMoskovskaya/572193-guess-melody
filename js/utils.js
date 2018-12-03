 export const renderElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element;
};


export const showScreen = (screen) => {
  const mainContainerElement = document.querySelector(`.main`);
  mainContainerElement.innerHTML = ``;
  mainContainerElement.appendChild(screen);
};

export const clearArray = (arr) => {
  arr.length = 0;
};
