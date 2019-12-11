import React, {useState} from 'react';
import './styles.scss';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Sidebar from '../../../components/Sidebar/index';
import TextEditor from '../../../components/EditorDeTexto/index'
import DadosNoticia from '../../../components/DadosNoticia/index'

export default function CriarNoticia(){
  
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const handleSubmit = e => {
    console.log('Text: ', text);
    console.log('Title: ', title);
    console.log('Subtitle: ', subtitle);

    e.preventDefault();
    e.stopPropagation();
  }

  const handleChildChange = e => {
    console.log('Text will be modify');
    setText(e.target.getContent());
  }


  return (
    <>
    <Sidebar titulo="Criar notícia" ativo={6} key={"sidebar"}/>
    <div className='newsContent'>
      <Form onSubmit={handleSubmit} >
        <DadosNoticia setTitle={setTitle} setSubtitle={setSubtitle} />
        <div className='newsEditor'>
          <TextEditor handleChange={handleChildChange}/>   
        </div>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Cadastrar</Button>
          </Col>
        </Form.Group>
      </Form>

    </div>

    </>
  );
    

}
