import React from 'react';
import PropTypes from 'prop-types';
import { t } from './Quiz.jsx'
import { quizDefs } from './data.jsx'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Types extends React.Component {
  onStart = (event) => {
    this.props.onStart(parseInt(event.currentTarget.value, 10));
  }

  render() {
    var types, self;
    self = this;

    types = this.props.quizDefs.map(function (btn, i) {
      return (
        <div className="col-md-4" key={i}>
          <Card className="my-2">
            <Card.Header>
              {t(btn.text)}
            </Card.Header>
            <Card.Body>
              <Card.Text>{t(btn.caption)}</Card.Text>
              <Button
                value={btn.value}
                onClick={self.onStart}
                variant="primary"
              >
                {t('Start')}
              </Button>
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
