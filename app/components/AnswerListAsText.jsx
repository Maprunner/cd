'use strict';
import React from 'react';
import {t} from './Quiz.jsx'
import RaisedButton from 'material-ui/lib/raised-button';

export class AnswerAsText extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.answer);
  }

  render() {
    return(
      <RaisedButton
        onTouchTap={this.onClick}
        style={{margin: '8px', textTransform: 'none', padding: '0 4px',
        minWidth: '200px'}}
      >
        {this.props.number  + ') ' + t(this.props.answer)}
      </RaisedButton>
    );
  }
}

export class AnswerListAsText extends React.Component {
  render() {
    var self = this;
    if (!this.props.answers) {
      return null;
    }
    var answers = this.props.answers.map(function(ans, i) {
      return(
        <AnswerAsText
          key={i}
          number={i + 1}
          answer={ans.desc}
          onClick={self.props.onClick}
        />
      );
    });
    if(!answers.length) {
      return null;
    }
    return (
      <div className='answer-container'>
        {answers}
      </div>
    )
  }
}
