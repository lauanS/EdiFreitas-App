import React, {useState, useEffect, useRef} from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';
import Loader from '../Loader';

import axios from "axios";
import {getEventosHome, getNoticiasHome, getPublicAlbum} from '../../services';

export default function MyCarousel(){
  const [src, setSrc] = useState([]);
  const [active, setActive] = useState(0);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mounted = useRef(true);

  useEffect(() => {
    function load(){
      setIsLoading(true);
      axios.all([
        getEventosHome(),
        getNoticiasHome(),
        getPublicAlbum()
        ]).then(axios.spread((eventos, noticias, albuns) => {
          let arraySrc = [], obj;
          if(eventos.data && eventos.data.length > 0){
            obj = {
              url: `/eventos/${eventos.data[0].id}`,
              title: 'Evento ' + eventos.data[0].nome,
              photo: eventos.data[0].capa
            }
            arraySrc.push(obj)
          }
          if(noticias.data && noticias.data.length > 0){
            obj = {
              url: `/noticias/view/${noticias.data[0].id}`,
              title: 'Notícia ' + noticias.data[0].titulo,
              photo: noticias.data[0].foto
            }
            arraySrc.push(obj)
          }
          if(albuns.data && albuns.data.length > 0){
            obj = {
              url: `/galeria/${albuns.data[0].id}`,
              title: 'Álbum ' + albuns.data[0].nome,
              photo: albuns.data[0].capa.url
            }
            arraySrc.push(obj)
          }
          if(mounted.current){
            setSrc(arraySrc);
            setErrors(false);
            setIsLoading(false);
          }
        }))
        .catch(() => {
          if(mounted.current){
            setSrc([]);
            setErrors(true);
            setIsLoading(false);
          }
        });
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
