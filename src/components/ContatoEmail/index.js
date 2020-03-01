import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import Snackbar  from "../Snackbars";

import {sendEmailService} from '../../services'

export default function ContatoOng(props){
    
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  const sendEmail = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    var obj = {
      email : email,
      nome : name,
      texto: message
    }
    
    try{
      await sendEmailService(obj);
      setOpenAlertSuccess(true);
      setOpenAlertError(false);
    }catch(error){
      setOpenAlertSuccess(false);
      setOpenAlertError(true);
    }
  }

  return (
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="E-mail enviado com sucesso" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg="Ocorreu um erro ao enviar" type="error"/>
    <br/>
      <form id="contact-form" className="container-fluid pl-0" onSubmit={sendEmail}>
        <div className="form-group">
            <label>Nome</label>
            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="form-group">
            <label >Email</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="form-group">
            <label>Menssagem</label>
            <textarea className="form-control" rows="5" value={message} onChange={(event) => setMessage(event.target.value)} ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </>
  );
}


