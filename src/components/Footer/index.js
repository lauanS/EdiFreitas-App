import React from 'react';
import './styles.scss';

import Instagram from '@material-ui/icons/Instagram';
import Facebook from '@material-ui/icons/Facebook';

export default class Footer extends React.Component{
  render(){
    return (
      <div className="foot">        
        <div className="foot__row">
          <a className="foot__link" href="http://facebook.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
            <Facebook className="foot__icons" />
          </a>
          <a className="foot__link" href="http://instagram.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
            <Instagram className="foot__icons" />
          </a>
        </div>

        <br/>
        <div className="foot__row">
          <p>Rua Três, N° 12, Jardim Itapemirim, CEP 18071-852.</p>
        </div>
        <div className="foot__row">
          <p>Sorocaba - São Paulo - Brasil.</p>
        </div>

        <br/>
        <div className="foot__row">
          <p>{"ONG EdiFreitas, 2015 - "}{new Date().getFullYear()}</p>
        </div>

      </div>
    );
  }
}
