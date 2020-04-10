import React from 'react';
import { t } from './Quiz.jsx';
import WebResults from './WebResults.jsx';
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

  renderResults(results, title, name, number) {
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
        <h4>{title}</h4>
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
              {this.renderResults(this.props.allTimeResults, t('My results'))}
            </Row>
            <Row><h4>{t("Symbols")}</h4></Row>
            <Row className="py-2">
              <WebResults
                results={this.props.webResults[0]}
                name={this.props.name}
                number={this.props.number}
              />
            </Row>
            <Row><h4>{t("Text")}</h4></Row>
            <Row className="py-2">
              <WebResults
                results={this.props.webResults[1]}
                name={this.props.name}
                number={this.props.number}
              />
            </Row>
            <Row><h4>{t("Match")}</h4></Row>
            <Row className="py-2">
              <WebResults
                results={this.props.webResults[2]}
                name={this.props.name}
                number={this.props.number}
              />
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