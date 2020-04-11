import React from 'react';
import PropTypes from 'prop-types';
import { t } from './Quiz.jsx'
import { quizDefs } from './data.jsx'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import WebResults from './WebResults.jsx';
import _ from 'underscore';

// TODO
const MAX_RESULTS_TO_DISPLAY = 10;

class Types extends React.Component {

  onStart = (event) => {
    this.props.onStart(parseInt(event.currentTarget.value, 10));
  }

  doNothing = (event) => {
    return;
  }

  render() {
    const types = this.props.quizDefs.map((btn, i) => {
      // get results for this quiz type
      let filteredResults = this.props.webResults[btn.value].slice();
      // find my result
      let idx = filteredResults.findIndex(result => ((result.name === this.props.name) && (result.number === this.props.number)))
      if (idx !== -1) {
        const myResult = filteredResults[idx];
        filteredResults = filteredResults.slice(0, MAX_RESULTS_TO_DISPLAY);
        // add my result if I'm not in selected set
        if (idx >= MAX_RESULTS_TO_DISPLAY) {
          filteredResults.push(myResult);
        }
      } else {
        filteredResults = filteredResults.slice(0, MAX_RESULTS_TO_DISPLAY);
      }
      let disabled = "px-0";
      let onClick = this.onStart;
      let caption = t('Start');
      if (!_.isEmpty(this.props.results[btn.value])) {
        disabled = "disabled disabled-button px-0";
        onClick = this.doNothing;
        caption = this.props.results[btn.value].score + " / " + (this.props.results[btn.value].score + this.props.results[btn.value].wrong);
      }
        return (
        <div className="col-md-4" key={i}>
          <Card className="my-2">
            <Card.Header className="font-weight-bold">
              <Container>
                <Row>
              <Col md={8}>
                {t(btn.text)}
              </Col>
              <Col md={4}>
              <Button
                block
                value={btn.value}
                onClick={onClick}
                variant="primary"
                className={disabled}
              >
                {caption}
              </Button>
              </Col>
              </Row>
              </Container>
            </Card.Header>
            <Card.Body className="px-2 pb-2">
              <Card.Text>{t(btn.caption)}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <WebResults
                results={filteredResults}
                name={this.props.name}
                number={this.props.number}
                count={this.props.webResults[btn.value].length}
              />
            </Card.Footer>
          </Card>
        </div>
      );
    });

    return (
      <div className="row">
        {types}
      </div>
    );
  }
}

Types.defaultProps = {
  quizDefs: quizDefs
}

Types.propTypes = {
  onStart: PropTypes.func
}

export default Types;
