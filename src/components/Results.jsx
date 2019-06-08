import React from 'react';
import { t } from './Quiz.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
export const CD_QUIZ_RESULTS_ITEM = 'cdquiz-results';
export const CD_QUIZ_NAME_ITEM = 'cdquiz-name';
export const CD_QUIZ_LANGUAGE_ITEM = 'cdquiz-language';

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

export function loadLanguage() {
  return loadItem(CD_QUIZ_LANGUAGE_ITEM, 'en');
}

export function saveAllTimeResults(results) {
  saveItem(CD_QUIZ_RESULTS_ITEM, results);
}

export function saveName(name) {
  saveItem(CD_QUIZ_NAME_ITEM, name);
}

export function saveLanguage(lang) {
  saveItem(CD_QUIZ_LANGUAGE_ITEM, lang);
}

export class Results extends React.Component {
  handleClose = () => {
    this.props.handleClose();
  }

  renderResults(results, title) {
    var formattedResults;
    if (results.length === 0) {
      return (
        <div>
          <h4>{title}</h4>
          {t('No results yet')}
        </div>
      );
    }
    formattedResults = results.map(function (result, idx) {
      return (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{result.name}</td>
          <td>{t(result.type)}</td>
          <td className='text-center'>{result.score}/{result.from}</td>
          <td className='text-center'>{result.percent}</td>
          <td className='text-center'>{result.time}</td>
        </tr>
      );
    });

    return (
      <div>
        <h4>{title}</h4>
        <Table striped bordered condensed hover>
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
          <tbody>
            {formattedResults}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    return (
      <Modal show={this.props.open} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Results')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderResults(this.props.results, t('This session'))}
          {this.renderResults(this.props.allTimeResults, t('All time'))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Results;