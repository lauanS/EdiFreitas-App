import React, {useState, useEffect, useRef} from 'react';
import './styles.scss';

import MyNavbar from '../../../components/Navbar/index';
import { Link } from 'react-router-dom';
import {Col} from 'react-bootstrap';
import Loader from '../../../components/Loader';
import Footer from '../../../components/Footer';

import {getPublicAlbum} from '../../../services';

export default function Galeria() {
  const [albuns, setAlbuns] = useState([]);
  const [errors, setErros] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mounted = useRef(true);

  useEffect( () => {
    async function load(){
      setIsLoading(true);
      try{
        const response = await getPublicAlbum();

        if(mounted.current){
          setAlbuns(response.data);
          setErros(false);
          setIsLoading(false);
        }
      } catch(res) {
        if(mounted.current){
          setAlbuns([]);
          setErros(true);
          setIsLoading(false);
        }
      }
    }
    load();
    return () => {mounted.current = false}
  }, []);

  return (
    <div className="galeria">
      <MyNavbar initActive={3}/>
      <main className="galeria__main">
        {isLoading && !errors && 
        <div>
          <Loader type="dots" /> 
          <p className="galeria__load">Carregando os álbuns de fotos</p>
        </div>
        }
        {!isLoading && errors && <p className="galeria__error">Desculpe, houve algum problema</p>}

        {!isLoading && !errors && albuns && albuns.length === 0 && 
          <p className="galeria__notFound">Nenhum álbum de fotos encontrado no momento</p>}

        {!isLoading && !errors && albuns && albuns.length > 0 && 
        <section className="galeria__content">
        <div className="galeria__header">
          <h4>Galeria de fotos da ONG Edi Freitas</h4>
        </div>

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
        )}</div> 
        </section>}
      </main>
      
      <Footer />
    </div>
  );
}