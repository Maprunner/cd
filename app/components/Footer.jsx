'use strict';

import React from 'react';

export class Footer extends React.Component {
  render() {
    return(
      <div className='footer'>
        <div className='container'>
          <span>You can download a copy of the Maprunner IOF pictorial
            control description guide from the
            <a
              href='https://www.maprunner.co.uk/iof-control-descriptions/'
              target='_blank'
            >
            &nbsp;Maprunner&nbsp;
            </a>
            website.
          </span>
        </div>
      </div>
    );
  }
}
