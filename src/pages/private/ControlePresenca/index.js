import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';

export default class ControlePresenca extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Controle de presença" ativo={5} key={"sidebar"}/>
          </>
        );
      }

}
