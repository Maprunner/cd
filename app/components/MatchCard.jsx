'use strict';
import React from 'react';
import {t} from './Quiz.jsx';

class CardFace extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.idx);
  }

  render() {
    let style = 'cd-card';
    let content;
    if (this.props.question.type == 'text') {
      style = style + ' cd-card-text';
      content = t(this.props.question.desc);
    } else {
      style = style + ' cd-card-symbol cd';
      content = String.fromCharCode(this.props.question.code);
    }
    if (this.props.question.selected) {
      style = style + ' card-selected';
    }
    return(
      <div className={style} onClick={this.onClick}>
        {content}
      </div>
    );
  }
}

class FinishedCard extends React.Component {
  render() {
    return(
      <div className='cd-card card-got-it'>
        {t('OK')}
      </div>
    );
  }
}

export class MatchCard extends React.Component {
  render() {
    if (this.props.question.gotIt) {
      return(
        <FinishedCard />
      );
    }
    return(
      <CardFace
        question={this.props.question}
        idx={this.props.idx}
        onClick={this.props.onClick}
        type={this.props.question.type}
      />
  )
  }
}
