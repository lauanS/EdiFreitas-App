import React, {useState, useEffect} from 'react';
import '../styles.scss';

import MyNavbar from '../../../../components/Navbar/index';
import { Redirect, useParams } from "react-router-dom";
import {Col} from 'react-bootstrap';
import Loader from '../../../../components/Loader';
import Photo from '../../../../components/PhotoLightbox';
import Footer from '../../../../components/Footer';

import {findByIdEvento} from '../../../../services';

export default function Photos() {
  const { id } = useParams();

  const [evento, setEvento] = useState([]);
  const [errors, setErros] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect( () => {
    async function load(){
      setIsLoading(true);
      try{
        const response = await findByIdEvento();

        setEvento(response.data);
        if(response.data){
          setErros(false);
          setIsLoading(false);
          setNotFound(false);
        }
        else{
          setErros(true);
          setIsLoading(false);
          setNotFound(true);
        }
      } catch(res) {
        setPhoto([]);
        setEvento([]);
        setNotFound(false);
        setErros(true);
        setIsLoading(false);
      }
    }
    load();
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
        <section className="eventos__content">
          {isLoading && !errors && 
          <>
            <Loader type="dots" /> 
            <p className="eventos__load">Carregando o evento</p>
          </>
          }
          {!isLoading && errors && <p className="eventos__error">Desculpe, houve algum problema</p>}

          {!isLoading && !errors && evento && evento.length > 0 && 
            <Photo images={evento.capa} index={0} isOpen={openModal} setOpen={setOpenModal}/>
          }

          {!isLoading && !errors && evento && evento.length > 0 && 
          <div className="eventos__divImgEvento">
            <img className="eventos__img" src={evento.capa} alt="foto de capa do evento"/>
          </div>}
        </section>
      </main>
      <Footer />
    </div>}
    </>
  );

}