import React from 'react';

export class AnswerAsSymbol extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.answer);
  }

  render() {
    var chr = String.fromCharCode(this.props.code);
    return (
      <div className='big-cd-icon' onClick={this.onClick}>
        <span className='cd'>{chr}</span>
      </div>
    );
  }
}

class AnswerListAsSymbols extends React.Component {
  render() {
    var self = this;
    if (!this.props.answers) {
      return null;
    }
    var answers = this.props.answers.map(function (ans, i) {
      return (
        <AnswerAsSymbol
          key={i}
          answer={ans.desc}
          code={ans.code}
          onClick={self.props.onClick}
        />
      );
    });
    if (!answers.length) {
      return null;
    }
    return (
      <div>
        {answers}
      </div>
    )
  }
}

export default AnswerListAsSymbols;