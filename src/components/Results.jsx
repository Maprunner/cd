import React from 'react';
import { t } from './Quiz.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

export class Results extends React.Component {
  handleClose = () => {
    this.props.handleClose();
  }

  renderResults(results, title) {
    if (results.length === 0) {
      return (
        <div>
          <h4>{title}</h4>
          {t('No results yet')}
        </div>
      );
    }
    const formattedResults = results.map(function (result, idx) {
      return (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{result.name}</td>
          <td>{t(result.type)}</td>
          <td className='text-center'>{result.score}/{result.from}</td>
          <td className='text-center'>{result.time}</td>
        </tr>
      );
    });

    return (
      <div>
        <h4>{title}</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th>{t('Name')}</th>
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