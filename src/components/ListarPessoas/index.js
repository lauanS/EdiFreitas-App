import React, {useState, useEffect, useRef} from 'react';
import './styles.scss';

import ModalCard from './modalCard';
import {Form, Row, Col} from 'react-bootstrap';
import Loader from '../Loader';
import Snackbar from '../Snackbars';

import axios from "axios";
import {getResponsaveis, getCriancas} from '../../services';
import { idade } from "../../assist";

export default function ListarPessoas() {
  const [search, setSearch] = useState('');
  const [responsaveis, setResponsaveis] = useState([]);
  const [criancas, setCriancas] = useState([]);
  const [idadeMin, setIdadeMin] = useState('');
  const [idadeMax, setIdadeMax] = useState('');
  const [exibir, setExibir] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [alertSuccessDeletar, setAlertSuccessDeletar] = useState(false);
  const [alertErrorDeletar, setAlertErrorDeletar] = useState(false);
  const [alertSuccessUpdate, setAlertSuccessUpdate] = useState(false);
  const [alertErrorUpdate, setAlertErrorUpdate] = useState(false);
  
  const mounted = useRef(true);
  const [filteredResponsaveis, setFilteredResponsaveis] = useState([]);
  const [filteredCriancas, setFilteredCriancas] = useState([]);

  useEffect(() => {
    function load(){
      axios.all([
        getResponsaveis(),
        getCriancas()
        ]).then(axios.spread((responsavelRes, criancaRes) => {
          if(responsavelRes.data && criancaRes.data && mounted.current){
            setResponsaveis(responsavelRes.data);
            setCriancas(criancaRes.data);
            setIsLoading(false);
          }
        }))
        .catch((error) => {
          if(mounted.current){
            setErrors(true);
            setIsLoading(false);
          }
        });
    }
    load();

    return () => {mounted.current = false}
  }, [])

  useEffect(() => {
    function searchPeople (list) {
      return Array.isArray(list) ? list.filter(person => 
        person.nome.toLowerCase().indexOf(search.toLowerCase()) !== -1 && 
        ( idadeMax === '' || idade(person.dataNascimento) <= idadeMax) && 
        ( idadeMin === '' || idade(person.dataNascimento) >= idadeMin))
        : [];
    }

    if(mounted.current){
      setFilteredResponsaveis(exibir === 0 || exibir === 2 ? searchPeople(responsaveis) || [] : []);
      setFilteredCriancas(exibir === 0 || exibir === 1 ? searchPeople(criancas) || [] : []);
    }
    
  }, [responsaveis, criancas, search, exibir, idadeMax, idadeMin])

  const remover = () => {
    setAlertSuccessDeletar(true);
    setAlertErrorDeletar(false);
  }

  const erroRemover = () => {
    setAlertSuccessDeletar(false);
    setAlertErrorDeletar(true); 
  }

  const update = () => {
    setAlertSuccessUpdate(true);
    setAlertErrorUpdate(false);
  }

  const erroUpdate = () => {
    setAlertSuccessUpdate(false);
    setAlertErrorUpdate(true); 
  }

  const updateList = () => {
    axios.all([
      getResponsaveis(),
      getCriancas()
      ]).then(axios.spread((responsavelRes, criancaRes) => {
        if(responsavelRes.data && criancaRes.data && mounted.current){
          setResponsaveis(responsavelRes.data);
          setCriancas(criancaRes.data);
          setIsLoading(false);
        }
      }))
      .catch((error) => {
        if(mounted.current){
          setErrors(true);
          setIsLoading(false);
        }
      });
  }

  return (
    <>
    <Snackbar open={alertSuccessDeletar} setOpen={setAlertSuccessDeletar} msg="Informações deletadas" type="delete"/>
    <Snackbar open={alertErrorDeletar} setOpen={setAlertErrorDeletar} msg="Ocorreu um erro ao deletar" type="error"/>
    
    <Snackbar open={alertSuccessUpdate} setOpen={setAlertSuccessUpdate} msg="Informações atualizadas" type="delete"/>
    <Snackbar open={alertErrorUpdate} setOpen={setAlertErrorUpdate} msg="Ocorreu um erro ao atualizar" type="error"/>

    {isLoading && !errors && <Loader type="dots" />}
    {!isLoading && errors && "Houve algum problema"}
    {!isLoading && !errors &&
    <>
    <Form autoComplete="off">
      <Row>
        <Form.Group controlId="formGroupName">
          <Form.Label className="listarPessoas__label">
            Nome da pessoa:
          </Form.Label>
          <Col sm={8} className="listarPessoas__inputText">
            <Form.Control 
              type="text" 
              placeholder="Ex: Leonardo dos Santos Sampaio" 
              onChange={e => setSearch(e.target.value)}
              value={search}
            />
          </Col>
        </Form.Group>
        
        <Col sm="1" className="listarPessoas__colForm1">
          <Form.Group controlId="formGroupIdadeMin">
            <Form.Label >
              Idade mín.:
            </Form.Label> 
            <Form.Control
              type="number" 
              placeholder="Ex: 2"
              onChange={e => setIdadeMin(e.target.value)}
              value={idadeMin}
            />
          </Form.Group>
        </Col>

        <Col sm="1" className="listarPessoas__colForm1">
          <Form.Group controlId="formGroupIdadeMax">
            <Form.Label>
              Idade máx.:
            </Form.Label>
            <Form.Control
              type="number" 
              placeholder= "Ex: 30"
              onChange={e => setIdadeMax(e.target.value)}
              value={idadeMax}
            />
          </Form.Group>
        </Col>

        <Col sm="2" className="listarPessoas__colForm2">
          <Form.Group controlId="formGroupExibir">
            <Form.Label>
              Exibir:
            </Form.Label>
            <Form.Control 
              as="select"
              onChange={e => setExibir(Number(e.target.value))}
            >
              <option value={0}>Todas as pessoas</option>
              <option value={1}>Apenas crianças</option>
              <option value={2}>Apenas responsáveis</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
    
    {filteredResponsaveis.length === 0 && filteredCriancas.length === 0 ? 
      <p>Nenhuma pessoa encontrada</p> 
      :
      <>
      {filteredResponsaveis.length + filteredCriancas.length > 1 ?
        <p>Total de {filteredResponsaveis.length + filteredCriancas.length} resultados</p>
        :
        <p>Total de 1 resultado</p>
      }
      
      <div className="listarPessoas"> 
        {filteredResponsaveis.length > 0 && filteredResponsaveis.map(pessoa =>
          <ModalCard 
            updateList={updateList} 
            dados={pessoa} 
            key={"R" + pessoa.id} 
            crianca={false} 
            remover={remover} 
            erroRemover={erroRemover}
            update={update}
            erroUpdate={erroUpdate}  
          />
        )}
        {filteredCriancas.length > 0 && filteredCriancas.map(pessoa =>
          <ModalCard 
            updateList={updateList} 
            responsaveis={responsaveis} 
            dados={pessoa} 
            key={"C" + pessoa.id} 
            crianca={true} 
            remover={remover} 
            erroRemover={erroRemover}
            update={update}
            erroUpdate={erroUpdate} 
          />
        )}
      </div>
      </>
    }
    </>
    }
    </>
  );
}