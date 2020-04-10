import React from 'react';
import { baseData } from './data.jsx';

function getIcons() {
  const icons = baseData.map((data, id) => {
    return (
        <span key={id}>
          {String.fromCharCode(data.code)}
        </span>
      )
  })

  return icons;
}

function Icons() {
    return (
      <div className='cd icon-list text-center'>
        {getIcons()}
      </div>
    )
}

export default Icons;