import React, { useState, useEffect } from 'react';

import { Form, Collapse } from 'react-bootstrap';
import TextEditor from '../EditorDeTexto/index'
import DadosNoticia from '../DadosNoticia/index'
import Snackbar from '../Snackbars';
import UploadPhoto from '../UploadPhoto';
import Button from '@material-ui/core/Button';

import { postNoticia, putNoticia, postImagem } from '../../services';
import { saveSuccess, saveError } from "../../assist/feedback";
import { createFilename } from "../../assist";
import './styles.scss';

export default function EditorDeNoticia(props){
  const { initialTitle="", initialSubtitle="", initialText="", initialTags="" } = props;
  const { isUpdate, updateList, id } = props;

  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [openFieldError, setOpenFieldError] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [invalidatedTitle, setInvalidatedTitle] = useState(false);

  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [invalidatedSubtitle, setInvalidatedSubtitle] = useState(false);

  const [tags, setTags] = useState(initialTags);

  const [text, setText] = useState(initialText);
  const [invalidatedText, setInvalidatedText] = useState(false);

  const [imgBase64, setImgBase64] = useState("");

  const [open, setOpen] = useState(true);

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
  
      const img = {
        iBase: imgBase64,
        filename: createFilename("imgCapaDeNotícia", fullDate)
      }
      try {
        const urlImg = await postImagem(img);
        const obj = {
          titulo:title,
          descricao:subtitle,
          texto:text,
          foto:urlImg.url,
          data,
          tag:tags
        }
  
        if(isUpdate){
          await update(obj, id);
        }
        else{
          await save(obj);
        }
      } catch (error) {
        console.log("Erro no upload da img");
        console.log(error);
      }      
    }
    else{
      setOpenAlertSuccess(false);
      setOpenAlertError(false);
      setOpenFieldError(true);
    }
  }

  async function save(obj){
    console.log(obj.texto);
    try {
      await postNoticia(obj);
      setOpenAlertSuccess(true);
      setOpenAlertError(false);
      setOpenFieldError(false);
      resetFields();
    } catch (error) {
      setOpenAlertSuccess(false);
      setOpenAlertError(true);
      setOpenFieldError(false);
      console.log(error);
    }
  }

  async function update(obj, id){
    try {
      await putNoticia(obj, id);
      setOpenAlertSuccess(true);
      setOpenAlertError(false);
      setOpenFieldError(false);
      updateList();
    } catch (error) {
      setOpenAlertSuccess(false);
      setOpenAlertError(true);
      setOpenFieldError(false);
      console.log(error);
    }

  }

  const handleChildChange = e => {
    const content = e.target.getContent();
    setText(content);
  }

  return (
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} 
      msg={saveSuccess("Notícia")} type="success" />
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} 
      msg={saveError()} type="error" />
    <Snackbar open={openFieldError} setOpen={setOpenFieldError} 
      msg="Insira o conteúdo da notícia" type="error"/>



    <div className='news-content'>
      <Form onSubmit={handleSubmit} >
        <Collapse in={open}>
          <div id="fade-fields">
            <div className="news-uploadPhoto">
              <UploadPhoto
                imgBase64={imgBase64}
                setImgBase64={setImgBase64}
                imgWidth={500}
                imgHeight={500}
              />
            </div>

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
          >
            Esconder/exibir campos
          </Button>
        </div>


        <div className='news-editor'>
          <TextEditor text={text} handleChange={handleChildChange} isUpdate={isUpdate}/>      
        </div>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          className="center-button"
        >
          Salvar
        </Button>

      </Form>

    </div>

    </>
  );
    

}
