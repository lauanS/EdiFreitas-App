import React, { useState } from 'react';

import Snackbar from '../../Snackbars';

import EditorDeNoticia from '../index';
import { saveSuccess, saveError } from "../../../assist/feedback";

import './styles.scss';

export default function ContainerNoticia(props){
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  return(
    <>
    <Snackbar     
      open={openAlertSuccess} 
      setOpen={setOpenAlertSuccess} 
      msg={saveSuccess("Notícia")} 
      type="success"
    />
    <Snackbar 
      open={openAlertError} 
      setOpen={setOpenAlertError} 
      msg={saveError()} 
      type="error"
    />
    
    <EditorDeNoticia 
      setOpenAlertError={setOpenAlertSuccess}
      setOpenAlertSuccess={setOpenAlertSuccess}
    />
    </>
  );
}