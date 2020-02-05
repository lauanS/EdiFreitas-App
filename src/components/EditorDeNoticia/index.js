import React, {useState} from 'react';

import { Form, Button, Collapse } from 'react-bootstrap';
import TextEditor from '../EditorDeTexto/index'
import DadosNoticia from '../DadosNoticia/index'
import Snackbar from '../Snackbars';

import {postNoticia} from '../../services';

import {parseStringAsArray} from "../../assist/helpers"

import './styles.scss';

export default function EditorDeNoticia(props){
  const { initialTitle="", initialSubtitle="", initialText="", initialTags="" } = props;

  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [tags, setTags] = useState(initialTags);
  const [text, setText] = useState(initialText);

  const [open, setOpen] = useState(true);

  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);


  const urlImg = "https://cutetheworld.files.wordpress.com/2008/11/cutebug.png";

  async function handleSubmit(e){   
     
    e.persist();
    e.preventDefault();
    e.stopPropagation();

    const fullDate = new Date();
    const data = fullDate.toISOString().substr(0, 19);

    const obj = {
      titulo:title,
      descricao:subtitle,
      texto:text,
      foto:urlImg,
      data,
      // tag:parseStringAsArray(tags)
      tag:tags
    }

    try {
      const response = await postNoticia(obj);
      console.log("Tudo certo: ", response);
      setOpenAlertSuccess(true);
      setOpenAlertError(false);
    } catch (error) {
      console.log("Ocorreu um erro:", error);
      setOpenAlertSuccess(false);
      setOpenAlertError(true);
    }
    


  }

  const handleChildChange = e => {
    setText(e.target.getContent());
  }


  return (
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="Notícia criada!" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg="Ocorreu um erro ao criar a notícia" type="error"/>

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
