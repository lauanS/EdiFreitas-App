import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';

export default class Administrar extends React.Component{
  render(){
    return (
      <>
        <Sidebar titulo="Edi Freitas" ativo={-1}/>
        
        <div className="cad">
          <h4>Bem vindo ao sistema de gerenciamento da ONG Edi Freitas.</h4>
  
          <h6>&thinsp; &thinsp;Caso esteja em um dispositivo móvel, possivelmente as opções estão ocultas no menu,
          podendo ser encontrado na barra superior da tela
          </h6>

          <h6>&thinsp; &thinsp;Caso esteja utilizando outro dispositivo como um computador ou notebook,
          as opções podem ser encontradas no lado esquerdo a tela
          </h6>
        </div>
      </>
    );
  }

}
