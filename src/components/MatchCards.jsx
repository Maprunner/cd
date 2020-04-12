import React from 'react';
import MatchCard from './MatchCard.jsx';
import { t } from './Quiz.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import update from 'immutability-helper';

class MatchCards extends React.Component {
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
  }

  componentWillUnmount() {
    clearInterval(this.matchTimer);
  }

  onTick = () => {
    if (this.state.matched < (this.state.questions.length / 2)) {
      this.setState({ elapsed: this.state.elapsed + 1 });
    }
  }

  onCheckMatch = (idx) => {
    let a1 = this.state.questions[idx];
    let matched = this.state.matched;
    let attempts = this.state.attempts;
    let selected;
    let a2;
    if (this.state.selectedIdx !== null) {
      // card already selected: is this a match?
      attempts = attempts + 1;
      a2 = this.state.questions[this.state.selectedIdx];
      // match if same description and different card types
      if ((a1.desc === a2.desc) && (a1.type !== a2.type)) {
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
    let newQuestions = update(this.state.questions, { [idx]: { $set: a1 } });
    if (a2) {
      newQuestions = update(newQuestions, { [this.state.selectedIdx]: { $set: a2 } });
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

  handleClose = () => {
    this.props.onFinished(false);
  }

  render() {
    let self = this;
    let cards = this.state.questions.map(function (q, i) {
      return (
        <MatchCard
          idx={i}
          key={i}
          question={q}
          onClick={self.onCheckMatch}
        />
      );
    });
    let status = this.state.matched + ' ' + t('matched') + '. ';
    status = status + (this.state.attempts - this.state.matched) + ' ' + t('mistakes');
    status = status + '. ' + this.state.elapsed + ' ' + t('seconds') + '.';
    return (
      <Modal
        show={this.props.open}
        backdrop="static"
        onHide={this.handleClose}
        dialogClassName="match-cards"
      >
        <Modal.Header closeButton>
          <Modal.Title>{status}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cards}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal >
    );
  }
}

export default MatchCards;
