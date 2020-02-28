import React, { useState, useEffect } from 'react';
import CampoImagem from '../CampoImagem';
import CropFotos from '../CropFotos';
import './styles.scss';

export default function SimpleSnackbar(props) {


  const [imgBase64, setImgBase64] = useState("");
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

  useEffect(() => {
    console.log('src: ');
    console.log(src);
    console.log('openCrop: ');
    console.log(openCrop);
  }, [openCrop, src]);

  return (
    <>
    <CampoImagem
      onSelectFile={onSelectImg}
      text={imgBase64 ? "Selecionar outra foto" : "Selecionar a foto"}
      multiple={false}
    />

    <CropFotos
      cropping={{unit: 'px', aspect: 16/9, width: 320, height: 240, x: 0, y: 0}}
      open={openCrop}
      closed={handleClose}
      setNewImage={handleImg}
      src={src}
      textButton={"Concluir edição da foto de perfil"}
    />
    </>
  );
}
