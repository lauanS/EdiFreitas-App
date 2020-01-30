import React from 'react';

import Sidebar from '../../../components/Sidebar/index';
import ListarNoticias from "../../../components/ListarNoticias";

import './styles.scss';

export default class ConsultarNoticias extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Consultar notícias" ativo={7} key={"sidebar"}/>
          <div className="ConsultarPessoas">
            <ListarNoticias />
          </div>
          </>
        );
      }
}
