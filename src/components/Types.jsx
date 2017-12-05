import React from 'react';
import PropTypes from 'prop-types';
import {t} from './Quiz.jsx'
import {quizDefs} from './data.jsx'
import {Button, Panel} from 'react-bootstrap';

export class Types extends React.Component {
  onStart = (event) => {
    this.props.onStart(parseInt(event.currentTarget.value, 10));
  }

  render() {
    var types, self;
    self = this;

    types = this.props.quizDefs.map(function(btn, i) {
      return(
        <div className="col-md-4" key={i}>
          <Panel
            header={t(btn.text)}
            bsStyle="primary"
          >

            {t(btn.caption)}
            <Button
              value={btn.value}
              onClick={self.onStart}
              bsStyle="primary"
              className="center-block top-margin"
            >
              {t('Start')}
            </Button>
          </Panel>
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
