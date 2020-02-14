import React from 'react';
import './styles.scss';

import Sidebar from '../../../components/Sidebar/index';
import ListarAlbum from '../../../components/ListarAlbum/index';

export default class ConsultarGaleria extends React.Component{
  render(){
    return (
      <Sidebar titulo="Consultar galeria" ativo={9} key={"sidebar"}>
        <ListarAlbum/>
      </Sidebar>
    );
  }
}
