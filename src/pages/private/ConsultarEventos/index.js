import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';

export default class ConsultarEventos extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Consultar eventos" ativo={4} key={"sidebar"}/>
          </>
        );
      }

}
