'use strict';
import React from 'react';
import {t} from './Quiz.jsx';
import TextField from 'material-ui/TextField';

export class NameInput extends React.Component {
  onNameChange = (event) => {
    let name = event.target.value;
    // limit valid characters to 0 or more of quite a wide range
    const validChars = /^[ A-Za-z0-9!£\$%\^&\*()\-\+=:;@#\?\.,\[\]\{\}\/]*$/;
    if (name.match(validChars) === null) {
      name = this.props.name;
    }
    this.props.onSetName(name);
  }

  render(){
    return(
      <TextField
        maxLength={'25'}
        defaultValue={this.props.name}
        floatingLabelText={t('Name') + ':'}
        onChange={this.onNameChange}
      />
    );
  }
}
