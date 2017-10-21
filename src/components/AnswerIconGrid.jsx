import React from 'react';
import {t} from './Quiz.jsx';

export class SmallCDIcon extends React.Component {
  render() {
    var chr = String.fromCharCode(this.props.code);
    return (
      <div className='small-cd-icon cd'>
        <span
          className={this.props.gotIt ? 'correct' : 'wrong'}
          title={t(this.props.desc)}
        >
          {chr}
        </span>
      </div>
    );
  }
}

export class AnswerIconGrid extends React.Component {
  render() {
    var icons = this.props.questions.map(function(q, i) {
      return(
        <SmallCDIcon
          key={i}
          code={q.question.code}
          gotIt={q.gotIt}
          desc={q.question.desc}
        />
      );
    });
    return (
      <div className='answer-icon-container'>
        {icons}
      </div>
    )
  }
}
