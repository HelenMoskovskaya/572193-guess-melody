import HeaderView from '../view/header-view';
import {clearArray} from '../utils';
import {gameStates} from '../game-control';
import welcome from '../screen/welcome';


export default () => {
  const header = new HeaderView(gameStates);
  header.onClick = () => {
    welcome();
    clearArray(gameStates.userAnswersInfo);
  };
  return header;
};

