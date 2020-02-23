import React from 'react';

import { Card } from 'react-bootstrap'
import Button from '@material-ui/core/Button';

import './styles.scss';

export default function CardConsulta(props){
  const { dados, visualizar, excluir, editar, adicionar } = props;

  return (
    <>
    <Card className="cardAlbum">
      <Card.Header as="h5">{dados.nome}</Card.Header>

      <Card.Body className="cardAlbum__body">    
        {dados.capa !== null ?
          <img alt="capa do álbum" className="cardAlbum__img" src={dados.capa.url}/>
          :
          <div className="cardAlbum__default"/>
        } 
      </Card.Body>

      <Card.Footer>
        <div>
          {dados.totalFotos > 1 ? 
          <p className="cardAlbum__dados">Álbum com {dados.totalFotos} fotos</p>
          :
            <>
            {dados.totalFotos === 1 ? 
            <p className="cardAlbum__dados">Álbum com 1 foto</p>
            :
            <p className="cardAlbum__dados">Álbum sem foto</p>
            }
            </>
          }
        </div>
        <div className="cardAlbum__footer">
          <Button size="small" variant="outlined" color="primary" onClick={() => {visualizar(dados.id, dados.nome)}}>Ver todas as fotos</Button>
          <Button size="small" variant="outlined" color="primary" onClick={() => {adicionar(dados.id, dados.nome)}}>Adicionar fotos</Button>
          <Button size="small" variant="outlined" color="primary" onClick={() => {editar(dados.id, dados.nome)}}>Trocar nome</Button>
          <Button size="small" variant="outlined" color="primary"onClick={() => {excluir(dados.id, dados.nome)}}>Excluir álbum</Button>
        </div>
      </Card.Footer>
    </Card>
    </>
  );
}