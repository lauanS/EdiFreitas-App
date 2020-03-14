import React, { useState } from 'react';
import { Form, Collapse } from 'react-bootstrap';
import TextEditor from '../EditorDeTexto/index'
import DadosNoticia from '../DadosNoticia/index'
import Snackbar from '../Snackbars';
import UploadPhoto from '../UploadPhoto';
import Button from '@material-ui/core/Button';
import ButtonSave from '../ButtonSave';
import { postNoticia, putNoticia, putImagemUrl, postImagem } from '../../services';
import { checkMinCharacters } from '../../validated';
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

  const [imgBase64, setImgBase64] = useState("");
  const [invalidatedImgBase64, setInvalidatedImgBase64] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);

  function resetFields(){
    setTitle("");
    setSubtitle("");
    setTags("");
    setText("");
    setImgBase64("");
    setIsLoading(false);
  }

  function checkFields(){
    let isValid = true;

    if(!imgBase64 && !initialImg){
      setInvalidatedImgBase64(true);
      isValid = false;
    }
    if(imgBase64 && initialImg){
      setInvalidatedImgBase64(false);
    }
    if(!checkMinCharacters(title, setTitle, (_) => {}, setInvalidatedTitle)){
      isValid =  false;
    }
    if(!checkMinCharacters(subtitle, setSubtitle, (_) => {}, setInvalidatedSubtitle)){
      isValid = false;
    }
    if(text.length === 0){
      isValid = false;
    }

    return isValid;
  }

  async function handleSubmit(e){   
    e.persist();
    e.preventDefault();
    e.stopPropagation();

    if(isLoading){
      return;
    }
    setIsLoading(true);
    

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
      await updateList();
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
  const handleChildChange = (content, _) => {
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
                required={true}
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

        <ButtonSave 
          isLoading={isLoading}
          className='center-button'
        >
          Salvar
        </ButtonSave>


      </Form>

    </div>

    </>
  );
    

}
