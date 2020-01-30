import React from 'react';

import Sidebar from '../../../components/Sidebar/index';
import ListarEventos from "../../../components/ListarEventos";

import './styles.scss';

export default class ConsultarEventos extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Consultar eventos" ativo={4} key={"sidebar"}/>
          <div className="ConsultarPessoas">
            <ListarEventos />
          </div>
          </>
        );
      }

}
