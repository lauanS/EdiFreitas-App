import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import {Col} from 'react-bootstrap';
import Loader from '../Loader';

// import { notFind, deleteError, deleteSuccess} from "../../assist/feedback";
// import { desconverterData, getUrlBase } from "../../assist/";

import './styles.scss';
import { getAlbumHome } from '../../services';

export default function GaleriaHome(props){
  const { data, isLoading, action } = props;
  const [albuns, setAlbuns] = useState([]);

  useEffect(() => {
    async function load(){
      try {
        const response = await getAlbumHome();
        if(response.data){
          setAlbuns(response.data);
        }        
      } catch (error) {
        console.log(error);
      }
      
    }
    load();
  }, []);

  

  return(
    isLoading?
      <Loader type="dots" />
    :
    albuns.map((album, key) => (
      <Col xs={6} md={4} className="galeria__col" key={key}>
        <Link className="galeria__link" to={`/galeria/${album.id}`}>
          <div className="galeria__divImg">
            <img alt="capa do álbum" className="galeria__img" src={album.capa.url}/>
          </div>
          
          <div >
            <span className="galeria__albumTitle">{album.nome}</span>
            {album.totalFotos > 1 ?
              <span className="galeria__albumText">Álbum com {album.totalFotos} fotos</span>
              :
              <span className="galeria__albumText">Álbum com 1 foto</span>
            }
          </div>
        </Link>
      </Col>
    ))

  );
}