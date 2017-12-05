import 'bootstrap/dist/css/bootstrap.css';
import './css/cd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Quiz} from './components/Quiz.jsx';

const App = () => (
  <Quiz />
);

const app = document.createElement('div');

document.body.appendChild(app);

ReactDOM.render(
  <App />, app)
;

registerServiceWorker();
