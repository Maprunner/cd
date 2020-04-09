import React from 'react';
import PropTypes from 'prop-types';
import { t } from './Quiz.jsx'
import _ from 'underscore';
import { quizDefs } from './data.jsx'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import WebResults from './WebResults.jsx';

class Types extends React.Component {
  onStart = (event) => {
    this.props.onStart(parseInt(event.currentTarget.value, 10));
  }

  renderDetail = (btn, result, canStart, pos) => {
    if (_.isEmpty(result)) {
      let disabled = (canStart? "": "disabled")
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
    return (
      <>
      <Card.Text>{t(btn.caption)}</Card.Text>
      <Card.Text className="h4">{t("Position") + ": " + pos}</Card.Text>
      <Card.Text className="h4">{t("Score") + ": " + result.score}</Card.Text>
      <Card.Text className="h4">{t("Time") + ": " + result.time}</Card.Text>
      </>
    )

  }

  render() {
    const types = this.props.quizDefs.map((btn, i) => {
      const filteredResults = this.props.webResults.filter(result => result.type === btn.value);
      let idx = filteredResults.findIndex(result => ((result.name === this.props.name) && (result.number === this.props.number)))
      const myPosition = (idx === undefined) ? "" : idx + 1;
      let detail = this.renderDetail(btn, this.props.results[i], this.props.canStart, myPosition);
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
                results={filteredResults.slice(0,10)}
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
