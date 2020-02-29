import React, {useState, useEffect} from 'react';
import './styles.scss';

import MyNavbar from '../../../components/Navbar/index';
import { Link } from 'react-router-dom'
import {Col} from 'react-bootstrap';
import Loader from '../../../components/Loader';

import {getPublicAlbum} from '../../../services';

export default function Galeria() {
  const [albuns, setAlbuns] = useState([]);
  const [errors, setErros] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    async function load(){
      setIsLoading(true);
      try{
        const response = await getPublicAlbum();
        setAlbuns(response.data);
        setErros(false);
        setIsLoading(false);
      } catch(res) {
        setAlbuns([]);
        setErros(true);
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="galeria">
      <MyNavbar initActive={3}/>
      <main className={isLoading || errors ? "galeria__mainVH" : "galeria__main"}>
        <section className="galeria__content">
        {isLoading && !errors && 
        <>
          <Loader type="dots" /> 
          <p style={{textAlign: 'center'}}>Aguarde enquanto os álbuns de fotos são carregados</p>
        </>
        }
        {!isLoading && errors && <p style={{textAlign: 'center', color: '#bc2018'}}>Desculpe, houve algum problema</p>}

        {!isLoading && !errors && albuns && albuns.length === 0 && 
        <div className="galeria__header">
          <h4>Nenhum álbum de fotos encontrado no momento</h4>
        </div>}

        {!isLoading && !errors && albuns && albuns.length > 0 && 
        <div className="galeria__header">
          <h4>Galeria de fotos da ONG Edi Freitas</h4>
        </div>}

        {!isLoading && !errors && albuns && albuns.length > 0 && 
        <div className="galeria__row">{albuns.map((album, index) => 
          <Col xs={6} md={4} className="galeria__col" key={index}>
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
        )}</div> }
        </section>
      </main>
    </div>
  );
}