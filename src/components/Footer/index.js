import React from 'react';
import './styles.scss';

import Instagram from '@material-ui/icons/Instagram';
import Facebook from '@material-ui/icons/Facebook';

export default class Footer extends React.Component{
  render(){
    return (
      <div className="foot">        
        <div className="foot__row">
          <p className="foot__ong">ONG EdiFreitas, 2015 - {new Date().getFullYear()}</p>

          <div className="foot__divIcons">
            <a className="foot__link" href="http://facebook.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
              <Facebook className="foot__icons" />
            </a>
            <a className="foot__link" href="http://instagram.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
              <Instagram className="foot__icons" />
            </a>
          </div>
        </div>

      </div>
    );
  }
}
