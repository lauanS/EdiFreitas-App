import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';
import CadPessoa from '../../../components/CadastroResponsavel/index';

export default class CadastrarResponsavel extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Cadastrar responsável" ativo={0}/>

                    
          <div className="cad">
            <CadPessoa />   
          </div>
          </>
        );
      }

}