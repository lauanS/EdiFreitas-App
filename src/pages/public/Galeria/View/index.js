import React, {useState, useEffect} from 'react';
import '../styles.scss';

import MyNavbar from '../../../../components/Navbar/index';
import { Redirect, useParams } from "react-router-dom";
import {Col} from 'react-bootstrap';
import Loader from '../../../../components/Loader';

import {getImagem} from '../../../../services';
import {converterDataFormatISO} from '../../../../assist';

export default function Photos() {
  const { id } = useParams();

  const [photos, setPhotos] = useState([]);
  const [errors, setErros] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    async function load(){
      setIsLoading(true);
      try{
        const response = await getImagem(id);
        setPhotos(response.data);
        setErros(false);
        setIsLoading(false);
        if(response.data.length > 0){
          setNotFound(false);
        }
        else{
          setNotFound(true);
        }
      } catch(res) {
        setPhotos([]);
        setNotFound(false);
        setErros(true);
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  return (
    <>
    {notFound && <Redirect to="/galeria" />}
    {!notFound &&
    <div className="galeria">
      <MyNavbar initActive={3}/>
      <main className="galeria__main">
        <section className="galeria__content">
        {isLoading && !errors && 
        <>
          <Loader type="dots" /> 
          <p style={{textAlign: 'center'}}>Aguarde enquanto os álbuns de fotos são carregados</p>
        </>
        }

        {!isLoading && errors && <p style={{textAlign: 'center'}}>Houve algum problema</p>}

        {!isLoading && !errors && photos && photos.length > 0 && 
        <div className="galeria__header">
          <h4>Fotos do álbum: {photos[0].album.nome}</h4>
          <p>{photos[0].album.totalFotos} {photos[0].album.totalFotos > 0 ? 'fotos' : 'foto'}</p>
          <p>Álbum criado em: {converterDataFormatISO(photos[0].album.dataCriacao)}</p>
          <p>Última edição em: {converterDataFormatISO(photos[0].album.dataCriacao)}</p>
        </div>}

        {!isLoading && !errors && photos && photos.length > 0 && <div className="galeria__row">{photos.map((photo, index) => 
          <Col xs={6} md={4} className="galeria__col" key={index}>
            <div className="galeria__divImg">
              <img alt="capa do álbum" className="galeria__img" src={photo.url}/>
            </div>
          </Col>
        )}</div> }
        </section>
      </main>
    </div>}
    </>
  );
}