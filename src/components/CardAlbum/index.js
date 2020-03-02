import React from 'react';

import { Link } from 'react-router-dom';
import {Col} from 'react-bootstrap';


import './styles.scss';

export default function GaleriaHome(props){
  const { album } = props;
 

  return(
    <Col xs={10} md={4} className="CardAlbum__col">
      <Link className="CardAlbum__link" to={`/galeria/${album.id}`}>
        <div className="CardAlbum__divImg">
          <img alt="capa do álbum" className="CardAlbum__img" src={album.capa.url}/>
        </div>
        
        <div >
          <span className="CardAlbum__albumTitle">{album.nome}</span>
          {album.totalFotos > 1 ?
            <span className="CardAlbum__albumText">Álbum com {album.totalFotos} fotos</span>
            :
            <span className="CardAlbum__albumText">Álbum com 1 foto</span>
          }
        </div>
      </Link>
    </Col>
  );
}