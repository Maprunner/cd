import React from 'react';
import {t} from './Quiz.jsx';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export class NameInput extends React.Component {
  onNameChange = (event) => {
    let name = event.target.value;
    // limit valid characters to 1 to 25 of quite a wide range
    // eslint-disable-next-line
    const validChars = /^[ A-Za-z0-9!£\$%\^&\*()\-\+=:;@#\?\.,\[\]\{\}\/]{1,25}$/;
    if (name.match(validChars) === null) {
      // invalid name so stick with what we had previously
      name = this.props.name;
    }
    this.props.onSetName(name);
  }

  render(){
    return(
      <FormGroup
        controlId="frmNameInput"
        className="col-md-4"
      >
        <ControlLabel>{t('Name')}</ControlLabel>
        <FormControl
          type="text"
          value={this.props.name}
          placeholder={this.props.name}
          onChange={this.onNameChange}
        />
      </FormGroup>
    );
  }
}

