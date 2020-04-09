import React from 'react';
import PropTypes from 'prop-types';
import { t } from './Quiz.jsx'
import { quizDefs } from './data.jsx'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import WebResults from './WebResults.jsx';

const MAX_RESULTS_TO_DISPLAY = 3;

class Types extends React.Component {

  onStart = (event) => {
    this.props.onStart(parseInt(event.currentTarget.value, 10));
  }

  renderDetail = (btn, canStart) => {
    let disabled = (canStart ? "" : "disabled")
    return (
      <>
        <Card.Text>{t(btn.caption)}</Card.Text>
        <Button
          value={btn.value}
          onClick={this.onStart}
          variant="primary"
          className={disabled}
        >
          {t('Start')}
        </Button>
      </>
    )
  }

  render() {
    const types = this.props.quizDefs.map((btn, i) => {
      // get results for this quiz type
      let filteredResults = this.props.webResults.filter(result => result.type === btn.value)
      // find my result
      let idx = filteredResults.findIndex(result => ((result.name === this.props.name) && (result.number === this.props.number)))
      if (idx !== -1) {
        const myResult = filteredResults[idx];
        filteredResults = filteredResults.slice(0, MAX_RESULTS_TO_DISPLAY);
        if (idx >= MAX_RESULTS_TO_DISPLAY) {
          myResult.thisIsMe = true;
          filteredResults.push(myResult);
        } else {
          filteredResults[idx]["thisIsMe"] = true;
        }
      } else {
        filteredResults = filteredResults.slice(0, MAX_RESULTS_TO_DISPLAY);
      }

      let detail = this.renderDetail(btn, this.props.canStart);
      return (
        <div className="col-md-4" key={i}>
          <Card className="my-2">
            <Card.Header className="font-weight-bold">
              {t(btn.text)}
            </Card.Header>
           <Card.Body>
             {detail}
            </Card.Body>
            <Card.Footer>
              <WebResults
                results={filteredResults}
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
