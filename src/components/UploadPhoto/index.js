import React, { useState } from 'react';
import CampoImagem from '../CampoImagem';
import CropFotos from '../CropFotos';
import './styles.scss';

export default function UploadPhoto(props) {

  const {imgBase64, setImgBase64} = props;
  const {imgWidth=320, imgHeight=180} = props;
  const [invalidatedImgBase64, setInvalidatedImgBase64] = useState(false);
  const [imgOriginal, setImgOriginal] = useState("");
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
    setImgOriginal(src);
    setInvalidatedImgBase64(false);
  }

  const handleOpen = (e) => {
    e.preventDefault();
    setOpenCrop(true);
    setSrc(imgOriginal);
  }

  const handleClose = () => {
    setSrc(null);
    setOpenCrop(false);
  }

  return (
    <>
    {imgBase64 && (
      <div style={{ marginBottom: '5px'}}>
        <img 
          alt="Crop" 
          style={{  width: "100%",
                    maxWidth: imgWidth, 
                    maxHeight: imgHeight, 
                    borderRadius: '4px', 
                    border: '1px solid black', 
                    marginTop: '1px' }} 
          src={imgBase64} 
        />
      </div>
    )}
    <CampoImagem
      onSelectFile={onSelectImg}
      text={imgBase64 ? "Selecionar outra foto" : "Selecionar a foto"}
      multiple={false}
    />

    <CropFotos
      cropping={{unit: 'px', aspect: 16/9, width: 320, height: 180, x: 0, y: 0}}
      open={openCrop}
      closed={handleClose}
      setNewImage={handleImg}
      minWidth={256}
      minHeight={144}
      maxWidth={600}
      maxHeight={600}
      maxWidthImg={"100%"}
      src={src}
      textButton={"Concluir edição da foto de perfil"}
    />

    {invalidatedImgBase64 ? 
      <div className="CadastroCrianca__error">
        Campo obrigatório, selecione uma foto de perfil
      </div>
    :
    ''
    }
    </>
  );
}
