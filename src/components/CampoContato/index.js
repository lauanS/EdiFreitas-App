import React, { useState } from 'react';
import {Form, Col, Row} from 'react-bootstrap';

import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import { checkTelefone } from '../../validated';

import Telefone from './Telefone/index';
import Email from './Email/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';


export default function CampoContato(props){

  const { id, contacts, setContacts, type} =  props;

  const [validatedContact, setValidatedContact] = useState(false);
  const [invalidatedContact, setInvalidatedContact] = useState(false);


  function handleChangeContact(e, contacts, setContacts){
    let count = 0;

    // Atualiza o valor
    const newContacts = contacts.map(contact => {      
      if(id === count){
        count++;
        return e.value;
      }
      else{
        count++;
        return contact;
      }
    });

    // Verifica se é um email "valido"
    if(e.value.match(/.+@.+/gm)){
      // quando for um e-mail
      setValidatedContact(true);
      setInvalidatedContact(false);

    }
    else if(e.value.match(/[\d]{9}/gm)){
      // quando for um telefone
      checkTelefone(e, setValidatedContact, setInvalidatedContact)
    }
    else if(!e.value.length){
      // quando estiver vazio
      setValidatedContact(false);
      setInvalidatedContact(false);
    }
    else{
      // quando for um contato inválido
      setValidatedContact(false);
      setInvalidatedContact(true);
    }
      
    setContacts(newContacts);

  }

  function removeContact(id, contacts, setContacts){
    // Atualiza o valor
    const newContacts = contacts.filter(( _ , index) => id !== index);
    setContacts(newContacts);

  }

  const displayContactField = type => {
    if(type === "telefone"){
      return <Telefone id={id} contacts={contacts} setContacts={setContacts} />;
    }
    return <Email id={id} contacts={contacts} setContacts={setContacts} />;
  }

  return (
  <>
    { displayContactField(type) }
  </>
  );
}
