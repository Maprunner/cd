'use strict';
import React from 'react';
import {t} from './Quiz.jsx'
import {quizDefs} from './data.jsx'
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export class Types extends React.Component {
  onStart = (event) => {
    this.props.onStart(parseInt(event.currentTarget.value, 10));
  }

  render() {
    var types, self;
    self = this;
    const style = {
      width: '250',
      maxWidth: 'none',
      margin:16
    };

    types = this.props.quizDefs.map(function(btn, i) {
      return(
        <Card
          key={i}
          style={style}
        >
          <CardTitle
            title={t(btn.text)}
            subtitle={t(btn.caption)}
          />
          <CardActions>
            <RaisedButton
              label={t('Start')}
              value={btn.value}
              secondary={true}
              onTouchTap={self.onStart}
            />
          </CardActions>
        </Card>
      );
    });
    return (
      <div>
        {types}
      </div>
    );
  }
}

Types.defaultProps = {
  quizDefs: quizDefs
}

Types.propTypes = {
  onStart: React.PropTypes.func
}
