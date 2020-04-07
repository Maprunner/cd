import React from 'react';
import { t } from './Quiz.jsx';
import { quizDefs } from './data.jsx'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import _ from 'underscore';

export class Results extends React.Component {
  handleClose = () => {
    this.props.handleClose();
  }

  renderResults(results, title) {
    const formattedResults = results.map(function (result, idx) {
      if (_.isEmpty(result)) {
        return (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        );
      }
      return (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{result.name}</td>
          <td>{result.number}</td>
          <td>{t(quizDefs[idx].text)}</td>
          <td className='text-center'>{result.score}/{result.score + result.wrong}</td>
          <td className='text-center'>{result.time}</td>
        </tr>
      );
    });

    return (
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th>{t('Name')}</th>
              <th>{t('Number')}</th>
              <th>{t('Type')}</th>
              <th className='text-center'>{t('Score')}</th>
              <th className='text-center'>{t('Time')}</th>
            </tr>
          </thead>
          <tbody>
            {formattedResults}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    return (
      <Modal show={this.props.open} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Results')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="py-2">
              {this.renderResults(this.props.allTimeResults, t('All time'))}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Results;