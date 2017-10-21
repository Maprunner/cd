import React from 'react';
import {AnswerIconGrid} from './AnswerIconGrid.jsx'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {MATCH_ITEMS} from './data.jsx'
import {t} from './Quiz.jsx'

export class ResultMessage extends React.Component {
  handleClose = () => {
    this.props.handleClose();
  }

  render() {
    const actions = [
      <RaisedButton
        key={1}
        label='OK'
        secondary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <Dialog
        title={t('Congratulations') + ' '  + this.props.name}
        modal={false}
        open={this.props.open}
        actions={actions}
        autoScrollBodyContent={true}
        onRequestClose={this.handleClose}
      >
        {this.props.children}
        {this.props.type !== MATCH_ITEMS ?
          <AnswerIconGrid questions={this.props.questions} /> : null}
      </Dialog>
    );
  }
}
