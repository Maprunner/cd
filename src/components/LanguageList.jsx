import React from 'react';
import {t, availableLanguages} from './Quiz.jsx';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class LanguageList extends React.Component {
  handleChange = (event, index, value) => {
    this.props.onSelectLanguage(value);
  }

  render() {
    let languages = availableLanguages.map(function(lang, i){
      return(
        <MenuItem value={lang} primaryText={lang} key={i}/>
      );
    });

    return(
      <div className="dropdown-container">
        <p>{t('Language')}</p>
        <DropDownMenu
          value={this.props.language}
          onChange={this.handleChange}
        >
          {languages}
        </DropDownMenu>
      </div>
    )
  }
}
