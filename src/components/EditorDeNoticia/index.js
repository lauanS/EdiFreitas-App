import React, { useState, useEffect } from 'react';
import { Form, Collapse } from 'react-bootstrap';
import TextEditor from '../EditorDeTexto/index'
import DadosNoticia from '../DadosNoticia/index'
import Snackbar from '../Snackbars';
import UploadPhoto from '../UploadPhoto';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { postNoticia, putNoticia, putImagemUrl, postImagem } from '../../services';
import { saveSuccess, saveError } from "../../assist/feedback";
import { createFilename } from "../../assist";
import './styles.scss';

export default function EditorDeNoticia(props){
  const { initialTitle="", initialSubtitle="", initialText="", initialTags="" } = props;
  const { initialImg } = props;
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
  const [invalidatedImgBase64, setInvalidatedImgBase64] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
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
    if(!imgBase64 && !initialImg){
      setInvalidatedImgBase64(true);
      return false;
    }

    if(invalidatedTitle || invalidatedSubtitle || invalidatedText){
      return false;
    }
    return true;
  }

  async function handleSubmit(e){   
    setIsLoading(true);
    e.persist();
    e.preventDefault();
    e.stopPropagation();

    if(checkFields()){
      const fullDate = new Date();
      const data = fullDate.toISOString().substr(0, 19);
  
      try {
        let urlImg;
        
        if(isUpdate){
          // 1. Verifico se vou usar a initialImg com a url da imagem
          // 2. Se for a initial img, ja monto o obj e nao chamo o putImagem
          // 3. Se nao, chamo o putImagem com a nova imagem

          if(!imgBase64){
            urlImg = initialImg;  
          }else{
            const img = {
              iBase: imgBase64,
              filename: createFilename("imgCapaDeNotícia", fullDate),
              album: null,
              url: initialImg
            }

            const responseImg = await putImagemUrl(img);
            console.log(responseImg.data);
            urlImg = responseImg.data;      
          }

  
        }
        else{
          const img = {
            iBase: imgBase64,
            filename: createFilename("imgCapaDeNotícia", fullDate)
          }

          const responseImg = await postImagem(img);
          urlImg = responseImg.data.url;
        }

        
        const obj = {
          titulo:title,
          descricao:subtitle,
          texto:text.replace(/"/g, '&quot;'),
          foto:urlImg,
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
    setIsLoading(false);
  }

  async function save(obj){
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

  function FieldErrorMsg(){
    if(text.length === 0){
      return "Insira o conteúdo da notícia";
    }
    if(invalidatedImgBase64){
      return "Selecione uma imagem de capa para a notícia";
    }

    return "Preencha todos os campos obrigatórios"
    
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
      msg={FieldErrorMsg()} type="error"/>



    <div className='news-content'>
      <Form onSubmit={handleSubmit} >
        <Collapse in={open}>
          <div id="fade-fields">
            <div className="news-uploadPhoto">
              <UploadPhoto
                imgBase64={imgBase64}
                setImgBase64={setImgBase64}
                invalidatedImgBase64={invalidatedImgBase64}
                setInvalidatedImgBase64={setInvalidatedImgBase64}
                imgWidth={500}
                imgHeight={500}
                initialImg={initialImg}
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

        <div className="feedback">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            className="center-button"
            disabled={isLoading}
          >
            Salvar
          </Button>
          {isLoading && <CircularProgress size={24} color="inherit" className="progress"/>}
        </div>


      </Form>

    </div>

    </>
  );
    

}
