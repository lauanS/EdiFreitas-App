import React, {useState, useEffect} from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';
import Loader from '../Loader';

import {getCarousel} from '../../services';

export default function MyCarousel(){
  const [src, setSrc] = useState([]);
  const [active, setActive] = useState(0);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load(){
      try{
        setIsLoading(true);
        let response = await getCarousel();
        let arraySrc = [], obj;
        if(response.data.evento){
          obj = {
            url: `/eventos/${response.data.evento.id}`,
            title: 'Evento ' + response.data.evento.nome,
            photo: response.data.evento.capa
          }
          arraySrc.push(obj)
        }
        if(response.data.noticia){
          obj = {
            url: `/noticias/view/${response.data.noticia.id}`,
            title: 'Notícia ' + response.data.noticia.titulo,
            photo: response.data.noticia.foto
          }
          arraySrc.push(obj)
        }
        if(response.data.album){
          obj = {
            url: `/galeria/${response.data.album.id}`,
            title: 'Álbum ' + response.data.album.nome,
            photo: response.data.album.capa.url
          }
          arraySrc.push(obj)
        }
        if(arraySrc.length > 0){
          setSrc(arraySrc);
          setErrors(false);
          setIsLoading(false);
        }
        else{
          setSrc([]);
          setErrors(true);
          setIsLoading(false);
        }
      }
      catch(res) {
        setSrc([]);
        setErrors(true);
        setIsLoading(false);
      };
    }
    load();
  }, [])

  const handlePrev = () => {
    setActive((active + src.length - 1) % src.length);
  }

  const handleNext = () => {
    setActive((active + 1) % src.length);
  }

  return (
    <>
    {isLoading && 
      <Loader type="dots" />
    }
    {errors && <p style={{textAlign: 'center'}}>Ocorreu um erro ao carregar</p> }
    
    {!isLoading && !errors &&
    <div className="carousel__divImg">
      <Link className="carousel__divImg" to={src[active].url}>
      <div className="carousel__divFundo">
        <div className="carousel__fundo">
          <span className="carousel__span">
            <img 
              className="carousel__imgFundo"
              alt="Crop" 
              src={src[active].photo} 
            />
          </span>
        </div>
        
      </div>
      
      <img 
        className="carousel__img"
        alt="Crop" 
        src={src[active].photo} 
      /></Link>
      <div className="carousel__text"><h5>{src[active].title}</h5></div>
      {src.length > 1 && <p className="carousel__prev" onClick={handlePrev}>&#10094;</p>}
      {src.length > 1 && <p className="carousel__next" onClick={handleNext}>&#10095;</p>}
    </div>
    }
    </>
  );
}
