'use strict';
import React from 'react';
import {t} from './Quiz.jsx';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
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
      return(
        <div>
          <h4>{title}</h4>
          {t('No results yet')}
        </div>
      );
    }
    formattedResults = results.map(function(result, idx) {
      return(
        <TableRow key={idx}>
          <TableRowColumn className='text-center'>{idx + 1}</TableRowColumn>
          <TableRowColumn>{result.name}</TableRowColumn>
          <TableRowColumn>{t(result.type)}</TableRowColumn>
          <TableRowColumn className='text-center'>{result.score}/{result.from}</TableRowColumn>
          <TableRowColumn className='text-center'>{result.percent}</TableRowColumn>
          <TableRowColumn className='text-center'>{result.time}</TableRowColumn>
        </TableRow>
      );
    });

    return(
      <div>
        <h4>{title}</h4>
        <Table bodyStyle={{padding: 0}}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn className='text-center'>#</TableHeaderColumn>
              <TableHeaderColumn>{t('Name')}</TableHeaderColumn>
              <TableHeaderColumn>{t('Type')}</TableHeaderColumn>
              <TableHeaderColumn className='text-center'>{t('Score')}</TableHeaderColumn>
              <TableHeaderColumn className='text-center'>%</TableHeaderColumn>
              <TableHeaderColumn className='text-center'>{t('Time')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            stripedRows={true}
          >
            {formattedResults}
          </TableBody>
        </Table>
      </div>
    );
  }

  render() {
    const actions = [
      <RaisedButton
        key={1}
        label='OK'
        secondary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return(
      <Dialog
        title={t('Results')}
        modal={false}
        open={this.props.open}
        actions={actions}
        autoScrollBodyContent={true}
        onRequestClose={this.handleClose}
      >
        {this.renderResults(this.props.results, t('This session'))}
        {this.renderResults(this.props.allTimeResults, t('All time'))}
      </Dialog>
    );
  }
}
