import React, {useState, useEffect, useRef} from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';
import Loader from '../Loader';

import {getCarousel} from '../../services';

export default function MyCarousel(){
  const [src, setSrc] = useState([]);
  const [active, setActive] = useState(0);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mounted = useRef(true);
  
  useEffect(() => {
    async function load(){
      setIsLoading(true);
      try {
        const res = await getCarousel();
        let arraySrc = [];
        if(res.data && res.data.album) {
          const album = res.data.album;
          let obj = {
            url: `/galeria/${album.id}`,
            title: 'Álbum ' + album.nome,
            photo: album.capa.url
          }
          arraySrc.push(obj);
        }
        if(res.data && res.data.noticia){
          const noticia = res.data.noticia;
          let obj = {
            url: `/noticias/view/${noticia.id}`,
            title: 'Notícia ' + noticia.titulo,
            photo: noticia.foto
          }
          arraySrc.push(obj);
        }
        if(res.data && res.data.evento){
          const evento = res.data.evento;
          let obj = {
            url: `/eventos/${evento.id}`,
            title: 'Evento ' + evento.nome,
            photo: evento.capa
          }
          arraySrc.push(obj);
        }
        if(mounted.current){
          setSrc(arraySrc);
          setErrors(false);
          setIsLoading(false);
        }
      } catch(error) {
          if(mounted.current){
            setSrc([]);
            setErrors(true);
            setIsLoading(false);
          }
      };
    }
    load();

    return () => {mounted.current = false}
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
