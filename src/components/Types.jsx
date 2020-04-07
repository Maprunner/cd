import React from 'react';
import PropTypes from 'prop-types';
import { t } from './Quiz.jsx'
import _ from 'underscore';
import { quizDefs } from './data.jsx'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Types extends React.Component {
  onStart = (event) => {
    this.props.onStart(parseInt(event.currentTarget.value, 10));
  }

  renderDetail = (btn, result) => {
    const self = this;
    if (_.isEmpty(result)) {
      return (
        <>
        <Card.Text>{t(btn.caption)}</Card.Text>
        <Button
          value={btn.value}
          onClick={self.onStart}
          variant="primary"
        >
          {t('Start')}
        </Button>
        </>
      )
    }
    return (
      <>
      <Card.Text>{t(btn.caption)}</Card.Text>
      <Card.Text className="h4">{result.score} / {result.score + result.wrong}</Card.Text>
      </>
    )

  }

  render() {
    const types = this.props.quizDefs.map((btn, i) => {
      let detail = this.renderDetail(btn, this.props.results[i]);
      return (
        <div className="col-md-4" key={i}>
          <Card className="my-2">
            <Card.Header className="font-weight-bold">
              {t(btn.text)}
            </Card.Header>
           <Card.Body>
             {detail}
            </Card.Body>
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
