import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';

export default class ConsultarGaleria extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Consultar galeria" ativo={9} key={"sidebar"}/>
          </>
        );
      }

}
