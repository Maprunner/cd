import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { t } from './Quiz.jsx'

export class AnswerAsText extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.answer);
  }

  render() {
    return (
      <Col>
        <Button
          variant='outline-primary'
          size='lg'
          block
          onClick={this.onClick}
        >
          {t(this.props.answer)}
        </Button>
      </Col>
    );
  }
}

class AnswerListAsText extends React.Component {
  render() {
    var self = this;
    if (!this.props.answers) {
      return null;
    }
    var answers = this.props.answers.map(function (ans, i) {
      return (
        <AnswerAsText
          key={i}
          number={i + 1}
          answer={ans.desc}
          onClick={self.props.onClick}
        />
      );
    });
    if (!answers.length) {
      return null;
    }
    return (
      <>
        {answers}
      </>
    )
  }
}

export default AnswerListAsText;