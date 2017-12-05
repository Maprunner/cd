import React from 'react';
import {t} from './Quiz.jsx';

export class SmallCDIcon extends React.Component {
  getContent() {
    if (this.props.code === 0) {
      return(
        <span
          className={'unanswered'}
          title={''}
        >
          {String.fromCharCode(59648)}
        </span>
      )
    } else {
      return(
        <span
          className={this.props.gotIt ? 'correct' : 'wrong'}
          title={t(this.props.desc)}
        >
          {String.fromCharCode(this.props.code)}
        </span>
      )
    }
  }
  
  render() {
    const content = this.getContent();
    
    return (
      <div className='small-cd-icon cd'>
        {content}
      </div>
    );
  }
}

