'use strict';
/*global $*/
import React from 'react';
import ReactDOM from 'react-dom';

var update = require('react-addons-update');

export class TextCard extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.idx);
  }

  render() {
    return(
      <div className={this.props.question.selected ?
        'cd-card cd-card-text card-selected'
        :
        'cd-card cd-card-text'
        }
        onClick={this.onClick}
      >
        {this.props.question.desc}
      </div>
    );
  }
}

export class SymbolCard extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.idx);
  }

  render() {
    var chr = String.fromCharCode(this.props.question.code);
    return(
      <div className={this.props.question.selected ?
        'cd-card cd-card-symbol cd card-selected'
        :
        'cd-card cd-card-symbol cd'
        }
        onClick={this.onClick}
      >
        <div>{chr}</div>
      </div>
    );
  }
}

export class FinishedCard extends React.Component {
  render() {
    return(
      <div className='cd-card card-got-it'>
        <div>OK</div>
      </div>
    );
  }
}

export class Card extends React.Component {
  render() {
    if (this.props.question.gotIt) {
      return(
        <FinishedCard />
      );
    }
    if (this.props.question.type === 'text') {
      return(
        <TextCard
          question={this.props.question}
          idx={this.props.idx}
          onClick={this.props.onClick}
        />
      );
    } else {
      return(
        <SymbolCard
          question={this.props.question}
          idx={this.props.idx}
          onClick={this.props.onClick}
        />
      );
    }
  }
}

export class MatchCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // use what we get as a basis for our own set of questions
        // which we track ourselves
        questions: this.props.questions,
        selectedIdx: null,
        matched: 0,
        attempts: 0,
        elapsed: 0
      };
  }
  
    componentDidMount() {
      this.matchTimer = setInterval(this.onTick, 1000);
      var node = ReactDOM.findDOMNode(this.refs.matchGrid);
      $(node).modal('show');
      // use event triggered when modal is hidden to cancel match
      $(node).on('hidden.bs.modal', this.props.onFinished.bind(this, false));
    }

  componentWillUnmount() {
   clearInterval(this.matchTimer);
  }

  onTick = () => {
    if (this.state.matched < (this.state.questions.length / 2)) {
      this.setState({elapsed: this.state.elapsed + 1});
    }
  }

  onCheckMatch = (idx) => {
    var a1, a2, selected, newQuestions, matched, attempts;
    a1 = this.state.questions[idx];
    matched = this.state.matched;
    attempts = this.state.attempts;
    if (this.state.selectedIdx !== null) {
      // card already selected: is this a match?
      attempts = attempts + 1;
      a2 = this.state.questions[this.state.selectedIdx];
      // match if same code and different card types
      if ((a1.code === a2.code) && (a1.type !== a2.type)) {
        // correct match
        a2.selected = false;
        a1.gotIt = true;
        a2.gotIt = true;
        matched = matched + 1;
      } else {
        // not a match
        a2.selected = false;
      }
      selected = null;
    } else {
      // first selected card
      a1.selected = true;
      selected = idx;
    }
    newQuestions = update(this.state.questions, {[idx]: {$set: a1}});
    if (a2) {
      newQuestions = update(newQuestions, {[this.state.selectedIdx]: {$set: a2}});
    }
    this.setState({
      questions: newQuestions,
      selectedIdx: selected,
      matched: matched,
      attempts: attempts
    })
    if (matched === (newQuestions.length / 2)) {
      this.props.onFinished(true, matched, attempts);
    }
  }

  render() {
    var self = this;
    var cards = this.state.questions.map(function(q, i) {
      return(
        <Card
          idx={i}
          key={i}
          question={q}
          onClick={self.onCheckMatch}
        />
      );
    });
    return(
      <div
        ref='matchGrid'
        className='modal match-modal fade'
        role='dialog'
        data-backdrop='static'
      >
        <div className='modal-dialog match-modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {this.state.matched} matched.&nbsp;
                {this.state.attempts - this.state.matched} mistakes.&nbsp;
                {this.state.elapsed} seconds.
              </h4>
            </div>
            <div className='modal-body'>
              {cards}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
