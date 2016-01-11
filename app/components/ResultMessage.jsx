'use strict';
/*global $*/
import React from 'react';
import ReactDOM from 'react-dom';
import {AnswersAsIcons} from './QuestionPage.jsx'
import {MATCH_ITEMS} from './data.jsx'
import {t} from './Quiz.jsx'

export class ResultMessage extends React.Component {
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this.refs.resultMessage);
    $(node).modal('show');
    // use event triggered when modal is hidden to reset visibility flag
    $(node).on('hidden.bs.modal', this.props.onClose);
  }

  render() {
    return (
    <div
      ref='resultMessage'
      className='modal fade'
      role='dialog'
      data-backdrop='static'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal'>&times;</button>
            <h4 className='modal-title'>{t('Congratulations') + ' '  + this.props.name}</h4>
          </div>
          <div className='modal-body'>
            {this.props.children}
            {this.props.type !== MATCH_ITEMS ?
              <AnswersAsIcons questions={this.props.questions} />
              :
              null
            }
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-default' data-dismiss='modal'>{t('OK')}</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
