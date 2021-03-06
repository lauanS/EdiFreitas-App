import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import Telefone from './Telefone/index';
import Email from './Email/index';

export default function CampoContato(props){

  const { id, contacts, setContacts, type} =  props;

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
