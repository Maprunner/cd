import React from 'react';
import { t } from './Quiz.jsx';
import Form from 'react-bootstrap/Form';

class NameInput extends React.Component {
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

  render() {
    return (
      <Form.Group
        controlId="frmNameInput"
        className="col-md-4"
      >
        <Form.Label>{t('Name')}</Form.Label>
        <Form.Control
          type="text"
          value={this.props.name}
          placeholder={this.props.name}
          onChange={this.onNameChange}
        />
      </Form.Group>
    );
  }
}

export default NameInput;

