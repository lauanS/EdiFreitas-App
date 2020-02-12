import React, {useState} from 'react';
import './styles.scss';

import CampoImagem from '../CampoImagem';
import CropFotos from '../CropFotos';

export default function AddFotos() {
  const [imgBase64, setImgBase64] = useState([]);
  const [imgOriginal, setImgOriginal] = useState([]);
  const [src, setSrc] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [index, setIndex] = useState(null);

  const onSelectImg = async (e) => {
    e.persist()
    let queUrl = [];
    if (e.target.files && e.target.files.length > 0) {
      for(let i = 0; i < e.target.files.length; i++){
        let url = await loadImg(e.target.files[i]);
        queUrl.push(url);
      }
      setImgOriginal(imgOriginal.concat(queUrl));
      setImgBase64(imgBase64.concat(queUrl));
      e.target.value = '';
    }
  }

  const loadImg = (file) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          resolve(reader.result);
        }
        );
        reader.readAsDataURL(file);
      }, 100);
    });
  }
  
  const handleImg = (base64, index) => {
    let newBase64 = imgBase64.slice();
    newBase64[index] = base64;
    setImgBase64(newBase64);
  }

  const handleOpen = (indice) => {
    setIndex(indice);
    setOpenCrop(true);
    setSrc(imgOriginal[indice]);
  }

  const handleClose = () => {
    setSrc(null);
    setOpenCrop(false);
  }

  return (
    <>
    <CampoImagem 
      onSelectFile={onSelectImg}
      text={"Selecionar fotos"}
      multiple={true}
    />
    <CropFotos
      cropping={{unit: 'px', aspect: 1, width: 200, height: 200, x: 0, y: 0}}
      open={openCrop}
      closed={handleClose}
      setNewImage={handleImg}
      src={src}
      minWidth={200}
      minHeight={200}
      maxWidth={500}
      maxHeight={500}
      maxWidthImg={500}
      textButton={"Concluir edição da foto"}
      index={index}
    />

    {imgBase64.length > 0 ? imgBase64.map((img, index) => 
    <div style={{ marginBottom: '5px'}} key={index}>
      <img 
        alt="Crop" 
        style={{ width: '200px', height: '200px', borderRadius: '4px', border: '1px solid black', marginTop: '1px' }} 
        src={img} 
      />
      <button onClick={(e) => {handleOpen(index)}}>clicl</button>
    </div>
    ) : ''}
      
    
    </>
  );
}