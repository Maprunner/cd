import React from 'react';
import { t, availableLanguages } from './Quiz.jsx';
import Form from 'react-bootstrap/Form';

class LanguageList extends React.Component {
  handleChange = (event) => {
    this.props.onSelectLanguage(event.target.value);
  }

  render() {
    let languages = availableLanguages.map(function (lang, i) {
      return (
        <option value={lang} key={i}>{lang}</option>
      );
    });

    return (

      <Form.Group
        controlId="frmLanguageSelect"
        className="col-md-4"
      >
        <Form.Label>{t('Language')}</Form.Label>
        <Form.Control
          onChange={this.handleChange}
          as="select"
          value={this.props.language}
        >
          {languages}
        </Form.Control>
      </Form.Group>
    )
  }
}

export default LanguageList;