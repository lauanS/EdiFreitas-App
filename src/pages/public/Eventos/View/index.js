import React, {useState, useEffect, useRef} from 'react';
import '../styles.scss';

import MyNavbar from '../../../../components/Navbar/index';
import { Redirect, useParams } from "react-router-dom";
import Loader from '../../../../components/Loader';
import Photo from '../../../../components/PhotoLightbox';
import Footer from '../../../../components/Footer';

import {findByIdEvento} from '../../../../services';
import {dateFullFormat} from '../../../../assist';

export default function Photos() {
  const { id } = useParams();

  const [evento, setEvento] = useState(null);
  const [errors, setErros] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const mounted = useRef(true);

  useEffect( () => {
    async function load(){
      setIsLoading(true);
      try{
        const response = await findByIdEvento(id);
        if(mounted.current){
          if(response.data){
            setEvento(response.data);
            setErros(false);
            setIsLoading(false);
            setNotFound(false);
          }
          else{
            setEvento(null);
            setErros(true);
            setIsLoading(false);
            setNotFound(true);
          }
        }
      } catch(res) {
        if(mounted.current){
          setEvento(null);
          setNotFound(false);
          setErros(true);
          setIsLoading(false);
        }
      }
    }
    load();

    return () => {mounted.current = false}
  }, [id]);

  const handleImage = () => {
    setOpenModal(true);
  }

  return (
    <>
    {notFound && <Redirect to="/eventos" />}
    {!notFound && 
    <div className="eventos">
      <MyNavbar initActive={1}/>
      <main className="eventos__main">
        {isLoading && !errors && 
        <div>
          <Loader type="dots" /> 
          <p className="eventos__load">Carregando o evento</p>
        </div>
        }
        {!isLoading && errors && <p className="eventos__error">Desculpe, houve algum problema</p>}

        {!isLoading && !errors && evento &&
        <section className="eventos__contentEvent">          
          <Photo images={[{url: evento.capa}]} index={0} isOpen={openModal} setOpen={setOpenModal}/>

          <div className="eventos__divImgEvento" onClick={handleImage}>
            <img className="eventos__img" src={evento.capa} alt="foto de capa do evento"/>
          </div>
          <div className="eventos__divInfoEvento">
            <span className="eventos__albumData">{dateFullFormat(evento.dataEvento)}</span>

            <span className="eventos__albumTitle">{evento.nome}</span>

            <span className="eventos__albumTextEvento" style={{marginBottom: '5px'}}>Local: {evento.local}</span>
            
            <span className="eventos__albumTextEvento">{evento.descricao}</span>
          </div>
        </section>}
      </main>
      <Footer />
    </div>}
    </>
  );

}