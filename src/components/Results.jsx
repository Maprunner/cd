import React from 'react';
import { t } from './Quiz.jsx';
import WebResults from './WebResults.jsx';
import { quizDefs } from './data.jsx'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
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
          <Tabs defaultActiveKey="myResults" id="uncontrolled-tab-example">
            <Tab eventKey="myResults" title={t('My results')}>
             {this.renderResults(this.props.allTimeResults, t('My results'))}
            </Tab>
            <Tab eventKey="symbols" title={t('Symbols')}>
            <WebResults
                results={this.props.webResults[0]}
                name={this.props.name}
                number={this.props.number}
                count={this.props.webResults[0].length}
              />
            </Tab>
            <Tab eventKey="text" title={t('Text')}>
            <WebResults
                results={this.props.webResults[1]}
                name={this.props.name}
                number={this.props.number}
                count={this.props.webResults[1].length}
            />
            </Tab>
            <Tab eventKey="match" title={t('Match')}>
            <WebResults
                results={this.props.webResults[2]}
                name={this.props.name}
                number={this.props.number}
                count={this.props.webResults[2].length}
              />
            </Tab>
            </Tabs>
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