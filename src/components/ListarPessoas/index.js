import React from "react";
import './styles.scss';
import ModalCard from './modalCard';

import {getPeople} from '../../services'
import {Form, Row, Col} from 'react-bootstrap';
import { checkTextForClass } from '../../validated';
import Loader from '../Loader';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isLoading: true,
      errors: false,
      valNome: false,
      invNome: false,
      establishments: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      getPeople()
        .then(res => {
          this.setState({ ...this.state, establishments: res.data, isLoading: false});
        })
        .catch(() =>
          this.setState({ ...this.state, errors: true, isLoading: false })
        );
    }, 2000);
  }

  updateSearch(e) {
    e.preventDefault();
    checkTextForClass(e.target, this.setSearch.bind(this));
  }

  setSearch(nome, val, inv){
    this.setState({ ...this.state, search: nome, valNome: val, invNome: inv});
  }

  searchPeople(list, search) {
    if (search === '') {
      return list;
		}

    return Array.isArray(list)
			? list.filter(
				person =>
          person.nome.toLowerCase().indexOf(search.toLowerCase()) !== -1 
			)
      : [];
  }

  idade(data) {
    let dia_aniversario = data.substring(8,10);
    let mes_aniversario = data.substring(5,7);
    let ano_aniversario = data.substring(0,4);

    let d = new Date();
    let ano_atual = d.getFullYear();
    let mes_atual = d.getMonth() + 1;
    let dia_atual = d.getDate();

    ano_aniversario = +ano_aniversario;
    mes_aniversario = +mes_aniversario;
    dia_aniversario = +dia_aniversario;

    let quantos_anos = ano_atual - ano_aniversario;

    if ((mes_atual < mes_aniversario) || (mes_atual === mes_aniversario && dia_atual < dia_aniversario)) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
  }

  render(){
    const { establishments, isLoading, errors, search } = this.state;
    const filteredList = this.searchPeople(establishments, search) || [];

    return (
      <>
      {isLoading ? <Loader type="dots" /> : errors ? "Houve algum problema" :
      
      (<>
      <Form autoComplete="off">
        <Form.Group as={Row} controlId="formGroupName">
          <Form.Label column sm={2} className="ListarPessoa-label">
            Nome da pessoa
          </Form.Label>
          <Col sm={8} className="ListarPessoa-inputText">
            <Form.Control 
              type="text" 
              placeholder="Ex: Leonardo dos Santos Sampaio" 
              onChange={this.updateSearch.bind(this)}
              value={this.state.search}
            />
          </Col>
        </Form.Group>
      </Form>
      

      {filteredList.length === 0 ? <p>Nenhuma pessoa encontrada com o nome: "{search}"</p> :
      <>
      {search === '' ? <p>Total de {filteredList.length} resultados</p>: <p>Total de {filteredList.length} resultados para "{search}"</p>}
      <div className="resultadosPessoas"> 
        {filteredList.length > 0 ? filteredList.map(pessoa =>
          <ModalCard dados={pessoa} key={pessoa.id} crianca={false}/>
        ) : 'Nada encontrado'}
      </div> </>}
      </>
      )}
      </>
    );
  }
}