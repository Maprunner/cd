import React from 'react';
import {t, availableLanguages} from './Quiz.jsx';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export class LanguageList extends React.Component {
  handleChange = (event) => {
    this.props.onSelectLanguage(event.target.value);
  }

  render() {
    let languages = availableLanguages.map(function(lang, i){
      return(
        <option value={lang} key={i}>{lang}</option>
      );
    });

    return(

    <FormGroup
      controlId="frmLanguageSelect"
      className="col-md-4"
    >
      <ControlLabel>{t('Language')}</ControlLabel>
      <FormControl
        onChange={this.handleChange}
        componentClass="select"
        value={this.props.language}
      >
        {languages}
      </FormControl>
    </FormGroup>
    )
  }
}
