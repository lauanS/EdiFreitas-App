import React, {useState, useEffect, useRef} from 'react';
import '../styles.scss';

import MyNavbar from '../../../../components/Navbar/index';
import { Redirect, useParams } from "react-router-dom";
import {Col} from 'react-bootstrap';
import Loader from '../../../../components/Loader';
import Photo from '../../../../components/PhotoLightbox';
import Footer from '../../../../components/Footer';

import {getImagem} from '../../../../services';
import {desconverterDataFormatISO} from '../../../../assist';

export default function Photos() {
  const { id } = useParams();

  const [photos, setPhotos] = useState([]);
  const [errors, setErros] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(null);

  const mounted = useRef(true);

  useEffect( () => {
    async function load(){
      setIsLoading(true);
      try{
        const response = await getImagem(id);

        if(mounted.current){
          setPhotos(response.data);
          setErros(false);
          setIsLoading(false);
          if(response.data.length > 0){
            setNotFound(false);
          }
          else{
            setNotFound(true);
          }
        }
      } catch(res) {
        if(mounted.current){
          setPhotos([]);
          setNotFound(false);
          setErros(true);
          setIsLoading(false);
        }
      }
    }
    load();
    return () => {mounted.current = false}
  }, [id]);

  const handleImage = (index) => {
    setIndex(index);
    setOpenModal(true);
  }

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

        {!isLoading && errors && <p style={{textAlign: 'center'}}>Desculpe, houve algum problema</p>}

        {!isLoading && !errors && photos && photos.length > 0 && 
        <Photo images={photos} index={index} isOpen={openModal} setOpen={setOpenModal}/>
        }
        
        {!isLoading && !errors && photos && photos.length > 0 && 
        <div className="galeria__header">
          <h4>Fotos do álbum: {photos[0].album.nome}</h4>
          <p>Álbum criado em: {desconverterDataFormatISO(photos[0].album.dataCriacao)}</p>
          <p>Última edição em: {desconverterDataFormatISO(photos[0].album.dataCriacao)}</p>
        </div>}
        
        {!isLoading && !errors && photos && photos.length > 0 && <div className="galeria__row">{photos.map((photo, index) => 
          <Col xs={6} md={4} className="galeria__col galeria__zoom" key={index} onClick={e => handleImage(index)}>
            <div className="galeria__divImg">
              <img alt="capa do álbum" className="galeria__img" src={photo.url}/>
            </div>
          </Col>
        )}</div> }
        </section>
      </main>
      <Footer />
    </div>}
    </>
  );
}