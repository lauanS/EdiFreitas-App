import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

export default function ContatoOng(props){
    
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const sendEmail = () => {

  }

  return (
    <>
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
        <button className="btn btn-primary">Enviar</button>
    </form>
    </>
  );
}


