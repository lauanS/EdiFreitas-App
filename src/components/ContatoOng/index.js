import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import Facebook from '@material-ui/icons/Facebook';
import Instagram from '@material-ui/icons/Instagram';

export default function ContatoOng(){
  return (
    <div className="contatoOng">
      <div className="contatoOng__info">
        <span className="contatoOng__txt1">Redes Sociais:</span>
        <br/>
        <div className="contatoOng__divIcons">
          <a className="contatoOng__link" href="http://facebook.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
            <Facebook className="contatoOng__icons" /> Facebook
          </a>

          <a className="contatoOng__link" href="http://instagram.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
            <Instagram className="contatoOng__icons" /> Instagram
          </a>
        </div>
      </div>

      <div className="contatoOng__info">
        <span className="contatoOng__txt1">Endereço:</span>
        <br/>
        <span className="contatoOng__txt2">Rua Três, N°12, Jardim Itapemirim - Sorocaba SP - CEP 18071-852</span>
      </div>


      <div className="contatoOng__info">
        <span className="contatoOng__txt1">Telefone:</span>
        <br/>
        <span className="contatoOng__txt2">(15) 98817-8399</span>
      </div>

      <div className="contatoOng__info">
        <span className="contatoOng__txt1">Email:</span>
        <br/>
        <span className="contatoOng__txt2">ongedifreitas@gmail.com</span>
      </div>
    </div>
  );
}