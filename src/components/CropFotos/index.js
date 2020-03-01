import React, { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import './styles.scss'

import ReactCrop from 'react-image-crop';
import {Modal, Button} from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';

export default function CropFotos(props) {
  const {cropping, open, src, textButton, closed, setNewImage} = props;
  const {minWidth=200, minHeight=200, maxWidth=500, maxHeight=500, maxWidthImg=500} = props
  const [crop, setCrop] = useState(cropping);
  const [imageRef, setImageRef] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleClose = () => {
    setCrop(cropping);
    closed();
  }

  const onImageLoaded = image => {
    setImageRef(image);
  };

  const onCropComplete = crop => {
    if(crop.x >= 0 && crop.y >= 0){
      setCrop(crop);
    }
  };

  const onCropChange = (crop, percentCrop) => {
    if(crop.x >= 0 && crop.y >= 0){
      setCrop(crop);
    }
  };

  const getCroppedImg = (e) => {
    let index = props.index || 0;
    e.preventDefault();
    
    if(imageRef && crop.width && crop.height) {  
      const image = imageRef;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            return;
          }
          blob.name = 'newFile.jpeg';
          window.URL.revokeObjectURL(fileUrl);
          setFileUrl(window.URL.createObjectURL(blob));
          setNewImage(canvas.toDataURL('image/jpeg'), index)
          resolve(fileUrl);
        }, 'image/jpeg');
      });
    }
    handleClose();
  }

    return (
    <>
      <Modal
        className="modalFoto"
        show={open}
        onHide={handleClose}
        dialogClassName="modalFoto__dialog"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable
        centered
      >
        <Modal.Header className="modalFoto__header">
          <p className="modalFoto__text">Cortar imagem</p>
          <p className="modalFoto__link" onClick={handleClose}><CloseIcon/> Cancelar</p>
        </Modal.Header>

        <Modal.Body>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              minWidth={minWidth}
              minHeight={minHeight}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
              keepSelection={true}
              imageStyle={{maxWidth: maxWidthImg, height: 'auto'}}
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button className="modalFoto__button" variant="success" onClick={getCroppedImg}>{textButton}</Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

