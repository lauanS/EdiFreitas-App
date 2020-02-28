import React, { useState } from 'react';
import CampoImagem from '../CampoImagem';
import CropFotos from '../CropFotos';
import './styles.scss';

export default function UploadPhoto(props) {
  const {required} = props;
  
  const {crop} = props;
  const {imgWidth=320, imgHeight=180} = props;

  const {initialImg} = props;
  const {imgBase64, setImgBase64} = props;
  const {invalidatedImgBase64, setInvalidatedImgBase64} = props;


  const [src, setSrc] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

  const onSelectImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setSrc(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setOpenCrop(true);
      e.target.value = '';
    }
  }

  const handleImg = (base64) => {
    setImgBase64(base64);
    setInvalidatedImgBase64(false);
  }


  const handleClose = () => {
    setSrc(null);
    setOpenCrop(false);
  }

  const showImg = () => {
    let srcImg = imgBase64? imgBase64 : initialImg;
    if(imgBase64 || initialImg){
      return (      
        <div style={{ marginBottom: '5px'}}>
        <img 
          alt="Crop" 
          style={{  width: "100%",
                    maxWidth: imgWidth, 
                    maxHeight: imgHeight, 
                    borderRadius: '4px', 
                    border: '1px solid black', 
                    marginTop: '1px' }} 
          src={srcImg} 
        />
        </div>
      );
    }
  }
  return (
    <>
    {showImg()}
    <CampoImagem
      onSelectFile={onSelectImg}
      text={imgBase64 ? "Selecionar outra foto" : "Selecionar a foto"}
      multiple={false}
    />

    {crop && 
      <CropFotos
        cropping={{unit: 'px', aspect: 16/9, width: 320, height: 180, x: 0, y: 0}}
        open={openCrop}
        closed={handleClose}
        setNewImage={handleImg}
        minWidth={256}
        minHeight={144}
        maxWidth={1920}
        maxHeight={1080}
        maxWidthImg={1080}
        src={src}
        textButton={"Concluir edição da foto de perfil"}
      />
    }
    

    {(invalidatedImgBase64 && required) ? 
      <div className="CadastroCrianca__error">
        Campo obrigatório, selecione uma foto
      </div>
    :
    ''
    }
    </>
  );
}
