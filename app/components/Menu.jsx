'use strict';
/*global _*/
import React from 'react';

export class MenuButton extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.btn.value);
  }

  render() {
    return (
      <li className={this.props.active === this.props.btn.value ? 'active' : null}
        onClick={this.onClick}
        title={this.props.btn.title}
      >
        <a href='#'>{this.props.btn.text}</a>
      </li>
    );
  }
}

export class MenuBar extends React.Component {
  render() {
    var menu, self, caption;
    self = this;
    menu = this.props.buttons.map(function(btn, i) {
      return(
        <MenuButton
          key={i}
          btn={btn}
          active={self.props.active}
          onClick={self.props.onSelect}
        />
      );
    });
    caption = _.chain(this.props.buttons)
      .where({'value': this.props.active})
      .pluck('caption')
      .value();
    return (
<div>
      <div className='container'>
        <div>
          <ul className='nav nav-pills'>
            {menu}
          </ul>
        </div>
        <div className='menu-text'>{caption}</div>
      </div>
</div>
    );
  }
}

MenuBar.defaultProps = {
  // can't use TEXT_TO_SYMBOLS as values since they get ignored for some reason
  buttons: [
    {text: 'Symbols',
     value: 1,
     caption: 'Identify the text description for a given symbol'
    },
    {text: 'Text',
     value: 2,
     caption: 'Identify the symbol for a given text description'
    },
    {text: 'Match',
     value: 3,
     caption: 'Match symbols and text'
   }
  ]
}
