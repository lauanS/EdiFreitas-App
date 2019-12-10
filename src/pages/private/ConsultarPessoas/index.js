import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';
import ListarPessoas from '../../../components/ListarPessoas/index';
import {getPeople} from '../../../services'

export default class ConsultarPessoas extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      establishments: [],
      isLoading: true,
      page: 1,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      getPeople()
        .then(res => {
          console.log(res);
        })
        .catch(() =>
          console.log("ruim")
        );
    }, 2000);
  }

  render(){
      return (
        <>
        <Sidebar titulo="Consultar pessoas" ativo={2} key={"sidebar"}/>
        <div className="listPessoas">
        
          <ListarPessoas />   

        </div>
        </>
      );
    }

}
