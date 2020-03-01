import React from 'react';

import Sidebar from '../../../components/Sidebar/index';
import ListarPessoas from '../../../components/ListarPessoas/index';


export default class ConsultarPessoas extends React.Component{

  exportarCriancas = () => {
    window.open('https://edi-freitas.herokuapp.com/api/criancas/export')
  }

  exportarResponsaveis = () => {
    window.open('https://edi-freitas.herokuapp.com/api/responsaveis/export')
  }

  render(){
    return (
      <Sidebar titulo="Consultar pessoas" ativo={2} key={"sidebar"}>
        <div className="row mb-3">
          <div className="col-12 col-sm-2">
            <button className="btn btn-primary col-12" onClick={this.exportarCriancas}>Exportar criancas</button>
          </div>

          <div className = "col-12 col-sm-2">
            <button className="btn btn-primary col-12" onClick={this.exportarResponsaveis}>Exportar resp.</button>
          </div>
        </div>
        <ListarPessoas />  
      </Sidebar>
    );
  }
}
