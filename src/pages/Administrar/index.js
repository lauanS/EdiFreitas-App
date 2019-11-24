import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import CadPessoa from '../../components/CadastroResponsavel/index';
import Sidebar from '../../components/Sidebar/index';

export default class Administrar extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Edi Freitas" ativo={0}/>
          
          <div className="cad">
            <CadPessoa />   
          </div>
          </>
        );
      }

}
