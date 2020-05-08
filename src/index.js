import './css/cd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Quiz from './components/Quiz.jsx';

ReactDOM.render(
  <Quiz />,
  document.getElementById('root')
);

// registerServiceWorker();
