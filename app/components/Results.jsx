'use strict';
import React from 'react';
import {t} from './data.jsx';

export const CD_QUIZ_RESULTS_ITEM = 'cdquiz-results';
export const CD_QUIZ_NAME_ITEM = 'cdquiz-name';

function loadItem(item, defaultValue) {
  var data = defaultValue;
  try {
    if ((window.hasOwnProperty('localStorage')) && (window.localStorage !== null)) {
      if (localStorage.getItem(item) !== null) {
        data = JSON.parse(localStorage.getItem(item));
      }
    }
    return data;
  } catch (e) {
    return data;
  }
}

function saveItem(item, value) {
  try {
    if ((window.hasOwnProperty('localStorage')) && (window.localStorage !== null)) {
      localStorage.setItem(item, JSON.stringify(value));
    }
  } catch (e) {
    return null;
  }
}

export function loadAllTimeResults() {
  return loadItem(CD_QUIZ_RESULTS_ITEM, []);
}

export function loadName() {
  return loadItem(CD_QUIZ_NAME_ITEM, 'Player 1');
}

export function saveAllTimeResults(results) {
  saveItem(CD_QUIZ_RESULTS_ITEM, results);
}

export function saveName(name) {
  saveItem(CD_QUIZ_NAME_ITEM, name);
}

export class Results extends React.Component {
  renderResults(results, title) {
    var formattedResults;
    if (results.length === 0) {
      return(
        <div>
          <h3>{title}</h3>
          {'No results yet'}
        </div>
      );
    }
    formattedResults = results.map(function(result, idx) {
      return(
        <tr key={idx}>
          <td className='text-center'>{idx + 1}</td>
          <td>{result.name}</td>
          <td>{result.type}</td>
          <td className='text-center'>{result.score}/{result.from}</td>
          <td className='text-center'>{result.percent}</td>
          <td className='text-center'>{result.time}</td>
        </tr>
      );
    });
    return(
      <div>
        <h3>{title}</h3>
        <table className='table table-striped table-bordered table-condensed'>
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th>{t('Name')}</th>
              <th>{t('Type')}</th>
              <th className='text-center'>{t('Score')}</th>
              <th className='text-center'>%</th>
              <th className='text-center'>{t('Time')}</th>
            </tr>
          </thead>
          <tbody>{formattedResults}</tbody>
       </table>
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.renderResults(this.props.results, t('This session'))}
        {this.renderResults(this.props.allTimeResults, 'All time')}
      </div>
    );
  }
}
