'use strict';
import './css/cd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Quiz} from './components/Quiz.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

main();

function main() {
  //Needed for onTouchTap in Material UI
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<Quiz />, app);
}
