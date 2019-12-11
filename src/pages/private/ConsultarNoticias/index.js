import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';

export default class ConsultarNoticias extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Consultar notícias" ativo={7} key={"sidebar"}/>
          </>
        );
      }

}
