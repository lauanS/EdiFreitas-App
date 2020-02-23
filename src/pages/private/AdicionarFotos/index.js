import React from 'react';
import './styles.scss';

import Sidebar from '../../../components/Sidebar';
import AddFotos from '../../../components/AddFotos';

export default class AdicionarFotos extends React.Component{
    render(){
        return (
          <Sidebar titulo="Cadastrar álbum" ativo={8}>
            <AddFotos />
          </Sidebar>
        );
      }
}
