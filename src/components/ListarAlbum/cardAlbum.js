import React from 'react';

import { Card } from 'react-bootstrap'
import Button from '@material-ui/core/Button';

import './styles.scss';

export default function CardConsulta(props){
  const { dados, visualizar, excluir, editar, id } = props;

  return (
    <>
    <Card className="cardAlbum">
      <Card.Header as="h5">{dados.nome}</Card.Header>

      <Card.Body className="cardAlbum__body">    
        <img alt="capa do álbum" className="cardAlbum__img" src={dados.capa.url}/>
      </Card.Body>

      <Card.Footer>
        <div>
          {dados.totalFotos > 1 ? 
          <p className="cardAlbum__dados">Álbum com {dados.totalFotos} fotos</p>
          :
          <p className="cardAlbum__dados">Álbum com 1 foto</p>
          }
        </div>
        <div className="cardAlbum__footer">
          <Button size="small" variant="outlined" color="primary" onClick={() => {visualizar(id, dados.nome)}}>Visualizar</Button>
          <Button size="small" variant="outlined" color="primary" onClick={() => {editar(id, dados.nome)}}>Editar</Button>
          <Button size="small" variant="outlined" color="primary"onClick={() => {excluir(id, dados.nome)}}>Excluir</Button>
        </div>
      </Card.Footer>
    </Card>
    </>
  );
}