import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import TextEditor from "../../EditorDeNoticia";
import { removeQuotationMarks } from "../../../assist";
import './styles.scss';

export default function EditarNoticia(props){
  const {id, title, subtitle, text="", urlImg, tags, show, setShow, updateList} = props;
  const handleClose = () => {setShow(false)}

  return (
    <>
    {show &&
    <>
    <div className="newsEditor__header">
      <p className="newsEditor__dados" onClick={handleClose}><ArrowBackIosIcon /><span className="newsEditor__text">Voltar</span></p>

    </div>

    <TextEditor 
        initialTitle={title}
        initialSubtitle={subtitle}
        initialText={removeQuotationMarks(text)}        
        initialTags={tags}
        initialImg={urlImg}
        isUpdate={true}
        updateList={updateList}
        id={id}
    />
   
    </>
    }
    </>
  );
      
}




