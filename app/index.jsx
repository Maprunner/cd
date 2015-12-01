'use strict';
import './css/cd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Quiz} from './components/Quiz.jsx';

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<Quiz />, app);
}
