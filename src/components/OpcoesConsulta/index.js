import React from 'react';

import {Col} from 'react-bootstrap';

import Button from '@material-ui/core/Button';

import './styles.scss';

export default function OpcoesConsulta(props){
  const {setSelectedObj, obj, setShowModal, deleteItem, viewCard} = props;

  return (
    <>
    <Button 
      size="small" 
      as={Col} 
      variant="outlined" 
      color="primary"
      href={viewCard}
      target="_blank"
    > 
      Visualizar 
    </Button>
    <Button 
      size="small"
      as={Col} 
      variant="outlined" 
      color="primary"
      onClick={() => {
        setSelectedObj(obj);
        setShowModal(true);
      }}
    > 
      Editar 
    </Button>
    <Button 
      size="small"
      as={Col} 
      variant="outlined" 
      color="primary"
      onClick={() => {  
        setSelectedObj(obj);
        deleteItem();
      }}
    > 
      Excluir 
    </Button>
    </>
  );
      
}




