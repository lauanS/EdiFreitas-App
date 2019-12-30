import React from "react";
import './index.scss';
import ModalCard from './modalCard';
import axios from "axios";
import {getResponsaveis, getCriancas} from '../../services'
import {Form, Row, Col} from 'react-bootstrap';
import Loader from '../Loader';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isLoading: true,
      errors: false,
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
      .catch(() =>
        this.setState({ ...this.state, errors: true, isLoading: false })
      );
    }, 2000);
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

  render(){
    const { responsaveis, criancas, isLoading, errors, search } = this.state;
    const filteredResponsaveis = this.searchPeople(responsaveis, search) || [];
    const filteredCriancas = this.searchPeople(criancas, search) || [];

    return (
      <>
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
            <ModalCard dados={pessoa} key={pessoa.id} crianca={false}/>
          ) : ''}
          {filteredCriancas.length > 0 ? filteredCriancas.map(pessoa =>
            <ModalCard dados={pessoa} key={pessoa.id} crianca={true}/>
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