'use strict';
/*global _*/
import React from 'react';
import {t} from './Quiz.jsx'
import {buttonDefs} from './data.jsx'

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
        <a href='#'>{t(this.props.btn.text)}</a>
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
        <div className='menu-text'>
          {t(caption)}
        </div>
      </div>
</div>
    );
  }
}

MenuBar.defaultProps = {
  buttons: buttonDefs
}
