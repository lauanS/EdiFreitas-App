import React, {useState} from 'react';

import { Form, Button, Collapse } from 'react-bootstrap';
import TextEditor from '../EditorDeTexto/index'
import DadosNoticia from '../DadosNoticia/index'

import './styles.scss';

export default function EditorDeNoticia(){
  
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("");

  const [open, setOpen] = useState(true);


  const handleSubmit = e => {
    console.log('Title: ', title);
    console.log('Subtitle: ', subtitle);
    console.log('Text: ', text);
    
    e.preventDefault();
    e.stopPropagation();
  }

  // Function that will be called by your child when he changed
  const handleChildChange = e => {
    setText(e.target.getContent());
    console.log('New text: ' + text);
  }


  return (
    <>
    <div className='news-content'>
      <Form onSubmit={handleSubmit} >
        <Collapse in={open}>
          <div id="fade-fields">
            <DadosNoticia setTitle={setTitle} setSubtitle={setSubtitle} />
          </div>
        </Collapse>

        <div className='div-button-hide'>
          <Button
            className='center-button'
            onClick={() => setOpen(!open)}
            aria-controls="fade-fields"
            aria-expanded={open}
            variant="link"
          >
            Esconder/exibir campo de título e subtítulo
          </Button>
        </div>


        <div className='news-editor'>
          <TextEditor handleChange={handleChildChange}/>      
        </div>

        <Button type="submit" block>Cadastrar</Button>

      </Form>

    </div>

    </>
  );
    

}
