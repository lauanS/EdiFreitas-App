import React from "react";
import './index.scss';
import ModalCard from './modalCard';
import axios from "axios";
import {getResponsaveis, getCriancas} from '../../services'
import {Form, Row, Col} from 'react-bootstrap';
import Loader from '../Loader';
import Snackbar from '../Snackbars';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isLoading: true,
      errors: false,
      alertSuccessDeletar: false,
      alertErrorDeletar: false,
      alertSuccessUpdate: false,
      alertErrorUpdate: false, 
      responsaveis: [],
      criancas: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      axios.all([
      getResponsaveis(),
      getCriancas()
      ]).then(axios.spread((responsavelRes, criancaRes) => {
        this.setState({ ...this.state, responsaveis: responsavelRes.data, criancas: criancaRes.data, isLoading: false});
      }))
      .catch(() => {
        this.setState({ ...this.state, errors: true, isLoading: false })
      });
    }, 2000);
  }

  updateList() {
    axios.all([
      getResponsaveis(),
      getCriancas()
      ]).then(axios.spread((responsavelRes, criancaRes) => {
        this.setState({ ...this.state, responsaveis: responsavelRes.data, criancas: criancaRes.data, isLoading: false});
      }))
      .catch(() => {
        this.setState({ ...this.state, errors: true, isLoading: false })
    });
  }

  updateSearch(e) {
    this.setState({ ...this.state, search: e.target.value});
    e.preventDefault();
  }

  searchPeople(list, search) {
    if (search === '') {
      return list;
		}

    return Array.isArray(list) ? list.filter(person =>
      person.nome.toLowerCase().indexOf(search.toLowerCase()) !== -1 )
      : [];
  }

  remover(id){
    this.setState({ ...this.state, alertSuccessDeletar: true,
      alertErrorDeletar: false});
  }

  erroRemover(){
    this.setState({ ...this.state, alertSuccessDeletar: false,
      alertErrorDeletar: true }); 
  }

  update(){
    this.setState({ ...this.state, alertSuccessUpdate: true,
      alertErrorUpdate: false});
  }

  erroUpdate(){
    this.setState({ ...this.state, alertSuccessUpdate: false,
      alertErrorUpdate: true }); 
  }

  setAlertSuccessDeletar(b){
    this.setState({ ...this.state, alertSuccessDeletar: b }); 
  }

  setAlertErrorDeletar(b){
    this.setState({ ...this.state, alertErrorDeletar: b }); 
  }

  setAlertSuccessUpdate(b){
    this.setState({ ...this.state, alertSuccessUpdate: b }); 
  }

  setAlertErrorUpdate(b){
    this.setState({ ...this.state, alertErrorUpdate: b }); 
  }

  render(){
    const { responsaveis, criancas, isLoading, errors, search } = this.state;
    const {alertSuccessDeletar, alertErrorDeletar, alertSuccessUpdate, alertErrorUpdate} = this.state;
    const filteredResponsaveis = this.searchPeople(responsaveis, search) || [];
    const filteredCriancas = this.searchPeople(criancas, search) || [];

    return (
      <>
      <Snackbar open={alertSuccessDeletar} setOpen={this.setAlertSuccessDeletar.bind(this)} msg="Informações deletadas" type="delete"/>
      <Snackbar open={alertErrorDeletar} setOpen={this.setAlertErrorDeletar.bind(this)} msg="Ocorreu um erro ao deletar" type="error"/>
      
      <Snackbar open={alertSuccessUpdate} setOpen={this.setAlertSuccessUpdate.bind(this)} msg="Informações atualizadas" type="delete"/>
      <Snackbar open={alertErrorUpdate} setOpen={this.setAlertErrorUpdate.bind(this)} msg="Ocorreu um erro ao atualizar" type="error"/>

      {isLoading ? <Loader type="dots" /> : errors ? "Houve algum problema" :
      <>
      <Form autoComplete="off">
        <Form.Group as={Row} controlId="formGroupName">
          <Form.Label column sm={2} className="listarPessoas__label">
            Nome da pessoa
          </Form.Label>
          <Col sm={8} className="listarPessoas__inputText">
            <Form.Control 
              type="text" 
              placeholder="Ex: Leonardo dos Santos Sampaio" 
              onChange={this.updateSearch.bind(this)}
              value={this.state.search}
            />
          </Col>
        </Form.Group>
      </Form>
      
      {filteredResponsaveis.length === 0 && filteredCriancas.length === 0 ? 
        <p>Nenhuma pessoa encontrada com o nome: "{search}"</p> 
        :
        <>
        {search === '' ?
          <p>Total de {filteredResponsaveis.length + filteredCriancas.length} resultados</p>:
          <p>Total de {filteredResponsaveis.length + filteredCriancas.length}  resultados para "{search}"</p>
        }
        
        <div className="listarPessoas"> 
          {filteredResponsaveis.length > 0 ? filteredResponsaveis.map(pessoa =>
            <ModalCard 
              updateList={this.updateList.bind(this)} 
              dados={pessoa} 
              key={"R" + pessoa.id} 
              crianca={false} 
              remover={this.remover.bind(this)} 
              erroRemover={this.erroRemover.bind(this)}
              update={this.update.bind(this)}
              erroUpdate={this.erroUpdate.bind(this)}  
            />
          ) : ''}
          {filteredCriancas.length > 0 ? filteredCriancas.map(pessoa =>
            <ModalCard 
              updateList={this.updateList.bind(this)} 
              responsaveis={responsaveis} 
              dados={pessoa} 
              key={"C" + pessoa.id} 
              crianca={true} 
              remover={this.remover.bind(this)} 
              erroRemover={this.erroRemover.bind(this)}
              update={this.update.bind(this)}
              erroUpdate={this.erroUpdate.bind(this)} 
            />
          ) : ''}
        </div>
        </>
      }
      </>
      }
      </>
    );
  }
}