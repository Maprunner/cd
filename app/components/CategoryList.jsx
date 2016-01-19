'use strict';
import React from 'react';
import {t} from './Quiz.jsx';
import Toggle from 'material-ui/lib/toggle';

export class CategoryList extends React.Component {
  render() {
    var self = this;
    var categories = this.props.categories.map(function(cat, idx){
      return (
        <Category
          key={idx}
          category={cat.name}
          use={cat.use}
          onClick={self.props.onClick}
        />
      );
    })
    return (
      <div>
        <div>
          {categories}
        </div>
        <strong>{this.props.total + ' ' + t('questions selected')}</strong>
      </div>
    )
  }
}

export class Category extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.category);
  }

  render(){
    return(
      <Toggle
        value={this.props.category}
        defaultToggled={this.props.use}
        onToggle={this.onClick}
        label={t(this.props.category)}
        style={{marginBottom:8}}
      />

    )
  }
}
