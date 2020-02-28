import React from 'react';
import './styles.scss';

import Loader from '../Loader';

export default function(props){
  const {showOverlay, msg} = props;

  return (
    <>
    { showOverlay === true ?
      <div id="overlay">
        <div id="text">
          <Loader type="dots" />
          <h3>{msg}</h3>
        </div>
      </div>
      : 
      ''
    }
    </>
  );
}