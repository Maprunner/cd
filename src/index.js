import './css/cd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Quiz} from './components/Quiz.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500, white, grey100, grey300, grey500, darkBlack,
        purpleA200, indigo100, indigo500, indigo700
       } from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo700,
    primary2Color: indigo500,
    primary3Color: indigo100,
    accent1Color: purpleA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Quiz />
  </MuiThemeProvider>
);

//Needed for onTouchTap in Material UI
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const app = document.createElement('div');

document.body.appendChild(app);

ReactDOM.render(
  <App />,
  app)
;

registerServiceWorker();
