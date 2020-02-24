import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import Facebook from '@material-ui/icons/Facebook';
import Instagram from '@material-ui/icons/Instagram';

export default function ContatoOng(props){
    
  
    return (
      <div className="contato-ong">
        <div className="info">
            <span className="txt1">Redes Sociais:</span>
            
            <br/>

            <div className="row">
                <a className="icons col-12 col-sm-6" href="http://facebook.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
                    <Facebook className="icons" /> Facebook
                </a>
                <br/>
                <a className="icons col-12 col-sm-6"  href="http://instagram.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
                    <Instagram className="icons" /> Instagram
                </a>
            </div>
        </div>


        <div className="info">
            <span className="txt1">Endereço:</span>
            <br/>
            <span className="txt2">Rua Três, N°12, Jardim Itapemirim - Sorocaba SP - CEP 18071-852</span>
        </div>


        <div className="info">
            <span className="txt1">Fale conosco:</span>
            <br/>
            <span className="txt3">(15)98817-8399</span>
        </div>

        <div className="info">
            <span className="txt1">Email:</span>
            <br/>
            <span className="txt3">ongedifreitas@gmail.com</span>
        </div>
        
      </div>
    );
}