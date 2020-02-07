import React, { useState, useEffect } from 'react';

import { Form, Button, Collapse } from 'react-bootstrap';
import TextEditor from '../EditorDeTexto/index'
import DadosNoticia from '../DadosNoticia/index'
import Snackbar from '../Snackbars';

import { postNoticia, putNoticia } from '../../services';

import './styles.scss';

export default function EditorDeNoticia(props){
  const { initialTitle="", initialSubtitle="", initialText="", initialTags="" } = props;
  const { isUpdate, id } = props;

  const [title, setTitle] = useState(initialTitle);
  const [invalidatedTitle, setInvalidatedTitle] = useState(false);

  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [invalidatedSubtitle, setInvalidatedSubtitle] = useState(false);

  const [tags, setTags] = useState(initialTags);

  const [text, setText] = useState(initialText);
  const [invalidatedText, setInvalidatedText] = useState(false);

  const [open, setOpen] = useState(true);

  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [openFieldError, setOpenFieldError] = useState(false);
  

  const urlImg = "https://cutetheworld.files.wordpress.com/2008/11/cutebug.png";

  /* Verifica se o texto é válido ou inválido */
  useEffect(() => {   
    setInvalidatedText(text.length === 0);  
  }, [text]);

  function resetFields(){
    setTitle("");
    setSubtitle("");
    setTags("");
    setText("");
  }

  function checkFields(){
    if(invalidatedTitle || invalidatedSubtitle || invalidatedText){
      return false;
    }
    return true;
  }

  async function handleSubmit(e){   
     
    e.persist();
    e.preventDefault();
    e.stopPropagation();

    if(checkFields()){
      const fullDate = new Date();
      const data = fullDate.toISOString().substr(0, 19);
  
      const obj = {
        titulo:title,
        descricao:subtitle,
        texto:text,
        foto:urlImg,
        data,
        tag:tags
      }

      console.log('obj:');
      console.log(obj);

      if(isUpdate){
        console.log("--Update--");
        await update(obj, id);
      }
      else{
        console.log("--Save--");
        await save(obj);
      }
      
    }
    else{
      setOpenAlertSuccess(false);
      setOpenAlertError(false);
      setOpenFieldError(true);
      console.log("Campos inválidos: ", title);
      console.log(subtitle);
      console.log(tags);
      console.log(text.length);
    }
  }

  async function save(obj){
    try {
      const response = await postNoticia(obj);
      console.log("Tudo certo: ", response);
      setOpenAlertSuccess(true);
      setOpenAlertError(false);
      setOpenFieldError(false);
      resetFields();
    } catch (error) {
      console.log("Ocorreu um erro:", error);
      setOpenAlertSuccess(false);
      setOpenAlertError(true);
      setOpenFieldError(false);
    }
  }

  async function update(obj, id){
    try {
      const response = await putNoticia(obj, id);
      setOpenAlertSuccess(true);
      setOpenAlertError(false);
      setOpenFieldError(false);
    } catch (error) {
      setOpenAlertSuccess(false);
      setOpenAlertError(true);
      setOpenFieldError(false);
    }

  }

  const handleChildChange = e => {
    const content = e.target.getContent();
    setText(content);
  }

  return (
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="Notícia salva!" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg={"Ocorreu um erro ao salvar a notícia"} type="error"/>

    <Snackbar open={openFieldError} setOpen={setOpenFieldError} msg="Insira o conteúdo da notícia" type="error"/>

    <div className='news-content'>
      <Form onSubmit={handleSubmit} >
        <Collapse in={open}>
          <div id="fade-fields">
            <DadosNoticia 
              title={title}
              setTitle={setTitle}
              setInvalidatedTitle={setInvalidatedTitle} 
              invalidatedTitle={invalidatedTitle}
              subtitle={subtitle}
              setSubtitle={setSubtitle} 
              setInvalidatedSubtitle={setInvalidatedSubtitle}  
              invalidatedSubtitle={invalidatedSubtitle}
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
