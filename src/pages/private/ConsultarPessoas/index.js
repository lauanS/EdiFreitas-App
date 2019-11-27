import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';
import ListarPessoas from '../../../components/ListarPessoas/index';

export default class ConsultarPessoas extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Consultar pessoas" ativo={2}/>
          <div className="listPessoas">
            <ListarPessoas />   
          </div>
          </>
        );
      }

}
