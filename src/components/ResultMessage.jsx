import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AnswerIconGrid from './AnswerIconGrid.jsx'
import { MATCH_ITEMS } from '../data/data.js'
import { t } from './Quiz.jsx'

class ResultMessage extends React.Component {
  handleClose = () => {
    this.props.handleClose();
  }

  render() {
    return (
      <Modal show={this.props.open} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Congratulations') + ' ' + this.props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.props.children}</div>
          {this.props.type !== MATCH_ITEMS ? <AnswerIconGrid answers={this.props.questions} /> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ResultMessage;
