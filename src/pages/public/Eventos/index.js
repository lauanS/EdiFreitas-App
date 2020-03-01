import React, {useState, useEffect} from 'react';
import './styles.scss';

import MyNavbar from '../../../components/Navbar/index';
import Loader from '../../../components/Loader';
import Footer from '../../../components/Footer';
import {Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

import {getEventos} from '../../../services';
import {dateFullFormat} from '../../../assist';

export default function Eventos(){
  const [proximosEventos, setProximosEventos] = useState([]);
  const [anterioresEventos, setAnterioresEventos] = useState([]);

  const [errors, setErros] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    async function load(){
      setIsLoading(true);
      try{
        const response = await getEventos();
        let proximoEventos = [];
        let anteriorEventos = [];

        for(let e of response.data){
          let ano = + parseInt(e.dataEvento.substring(0,4)),
          mes = + parseInt(e.dataEvento.substring(5,7)),
          dia = + parseInt(e.dataEvento.substring(8,10));

          let date = new Date() ;

          if(new Date(`${mes} ${dia}, ${ano} 23:59:59`) >= date){
            proximoEventos.push(e);
          }
          else{
            anteriorEventos.push(e);
          }
        }
        
        setProximosEventos(proximoEventos);
        setAnterioresEventos(anteriorEventos);
        setErros(false);
        setIsLoading(false);
      } catch(res) {
        setProximosEventos([]);
        setAnterioresEventos([]);
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
          <p className="eventos__load">Carregando os eventos</p>
        </>
        }
        {!isLoading && errors && <p className="eventos__error">Desculpe, houve algum problema</p>}
        
        {!isLoading && !errors && proximosEventos && anterioresEventos && proximosEventos.length === 0 && anterioresEventos.length === 0 &&
          <p className="eventos__notFound">Nenhum evento encontrado no momento</p>}

        {!isLoading && !errors && proximosEventos && anterioresEventos && (proximosEventos.length > 0 || anterioresEventos.length > 0) &&
        <div className="eventos__header">
          <h4>Próximos eventos</h4>
        </div>}

        {!isLoading && !errors && proximosEventos && proximosEventos.length === 0 && anterioresEventos.length > 0 &&
          <p className="eventos__error">Sem próximos eventos no momento</p>}

        {!isLoading && !errors && proximosEventos && proximosEventos.length > 0 && 
        <div className="eventos__row">{proximosEventos.map((evento, index) => 
          <Col xs={12} md={6} className="eventos__col" key={index}>
            <Link className="eventos__link" to={`/eventos/${evento.id}`}>
              <div className="eventos__divImg">
                <img alt="capa do evento" className="eventos__img" src={evento.capa}/>
              </div>
              <div className="eventos__divInfo">
                <span className="eventos__albumData">{dateFullFormat(evento.dataEvento)}</span>

                <span className="eventos__albumTitle">{evento.nome}</span>

                <span className="eventos__albumText">{evento.local}</span>
              </div>
            </Link>
          </Col>
        )}</div> }

        {!isLoading && !errors && anterioresEventos && anterioresEventos.length > 0 && 
          <Divider />
        }

        {!isLoading && !errors && anterioresEventos && anterioresEventos.length > 0 && 
        <div className="eventos__header eventos__marginTop16">
          <h4>Eventos já realizados</h4>
        </div>}

        {!isLoading && !errors && anterioresEventos && anterioresEventos.length > 0 && 
        <div className="eventos__row">{anterioresEventos.map((evento, index) => 
          <Col xs={12} md={6} className="eventos__col" key={index}>
            <Link className="eventos__link" to={`/eventos/${evento.id}`}>
              <div className="eventos__divImg">
                <img alt="capa do evento" className="eventos__img" src={evento.capa}/>
              </div>
              <div className="eventos__divInfo">
                <span className="eventos__albumData">{dateFullFormat(evento.dataEvento)}</span>

                <span className="eventos__albumTitle">{evento.nome}</span>

                <span className="eventos__albumText">{evento.local}</span>
              </div>
            </Link>
          </Col>
        )}</div> }
        </section>
      </main>
      <Footer />
    </div>
  );
}
