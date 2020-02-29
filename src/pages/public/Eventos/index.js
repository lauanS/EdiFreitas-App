import React, {useState, useEffect} from 'react';
import './styles.scss';

import MyNavbar from '../../../components/Navbar/index';
import Loader from '../../../components/Loader';

import {getEventos} from '../../../services';

export default function Eventos(){
  const [eventos, setEventos] = useState([]);
  const [errors, setErros] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    async function load(){
      setIsLoading(true);
      try{
        const response = await getEventos();
        setEventos(response.data);
        setErros(false);
        setIsLoading(false);
      } catch(res) {
        setEventos([]);
        setErros(true);
        setIsLoading(false);
      }
    }
    load();
  }, []);
  
  return (
    <div className="eventos">
      <MyNavbar initActive={1}/>
      <main className="eventos__main">
        <section className="eventos__content">
        {isLoading && !errors && 
        <>
          <Loader type="dots" /> 
          <p style={{textAlign: 'center'}}>Aguarde enquanto os eventos são carregados</p>
        </>
        }
        {!isLoading && errors && <p style={{textAlign: 'center', color: '#bc2018'}}>Desculpe, houve algum problema</p>}
        
        {!isLoading && !errors && eventos && eventos.length === 0 && 
        <div className="eventos__header">
          <h4>Nenhum álbum de fotos encontrado no momento</h4>
        </div>}

        {!isLoading && !errors && eventos && eventos.length > 0 && 
        <div className="eventos__header">
          <h4>Eventos da ONG Edi Freitas</h4>
        </div>}

        </section>
      </main>
    </div>
  );
}
