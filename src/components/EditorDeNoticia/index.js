import React, {useState} from 'react';

import { Form, Button, Collapse } from 'react-bootstrap';
import TextEditor from '../EditorDeTexto/index'
import DadosNoticia from '../DadosNoticia/index'

import './styles.scss';

export default function EditorDeNoticia(props){
  const { initialTitle="", initialSubtitle="", initialText="", initialTags="" } = props;

  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [tags, setTags] = useState(initialTags);
  const [text, setText] = useState(initialText);

  const [open, setOpen] = useState(true);


  const handleSubmit = e => {    
    e.preventDefault();
    e.stopPropagation();
  }

  const handleChildChange = e => {
    setText(e.target.getContent());
  }


  return (
    <>
    <div className='news-content'>
      <Form onSubmit={handleSubmit} >
        <Collapse in={open}>
          <div id="fade-fields">
            <DadosNoticia 
              title={title}
              setTitle={setTitle} 
              subtitle={subtitle}
              setSubtitle={setSubtitle} 
              tags={tags}
              setTags={setTags}
            />
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
          <TextEditor text={text} handleChange={handleChildChange}/>      
        </div>

        <Button type="submit" block>Cadastrar</Button>

      </Form>

    </div>

    </>
  );
    

}
