import React from 'react';
import {SmallCDIcon} from './SmallCDIcon.jsx'

export class AnswerIconGrid extends React.Component {
  render() {
    var j;
    let answered = this.props.answers.map(function(q, i) {
      return(
        <SmallCDIcon
           key={i}
           code={q.question.code}
           gotIt={q.gotIt}
          desc={q.question.desc}
        />
      )
    });
    let unanswered = [];
    for (j = this.props.answers.length; j < this.props.questions; j = j + 1) {
      unanswered.push(
        <SmallCDIcon
          key={j}
          code={0}
          gotIt={false}
          desc={''}
        />
      );
    }
    return (
      <div className='answer-icon-grid'>
        {answered.concat(unanswered)}
      </div>
    );
  }
}
