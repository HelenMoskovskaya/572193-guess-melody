import {showScreen} from './utils.js';
import welcomeScreenElement from './templates/welcome.js';
import {gameLevels} from './game-data.js';
import {initialState} from './game-data.js';
import initFailTriesScreen from './templates/fail-tries.js'
import initFailTimeScreen from './templates/fail-tries.js'
import initGameGenreScreen from './templates/game-genre.js'
import initGameArtistScreen from './templates/game-artist.js'
import initResultSuccessScreen from './templates/result-success.js'
import {countNotes, gameStates} from './game-control.js'

showScreen(welcomeScreenElement);
