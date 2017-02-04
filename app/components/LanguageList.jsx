'use strict';
import React from 'react';
import {availableLanguages} from './data.jsx';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {t} from './Quiz.jsx';

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
      <div>
        <span>{t('Language')}</span>
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
