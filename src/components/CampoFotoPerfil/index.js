import React, { PureComponent } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import './styles.scss'

import ReactCrop from 'react-image-crop';
import {Modal, Button} from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      src: null,
      crop: {
        unit: 'px',
        width: 201,
        aspect: 1 / 1,
      },
      openModal: false
    };
  }

  handleClose = () => {
    this.setState({...this.state, src: null, crop: {unit: 'px', width: 201, aspect: 1 / 1, x: 0, y: 0}, openModal: false})
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
      this.setState({...this.state, crop: {unit: 'px', width: 201, aspect: 1 / 1, x: 0, y: 0}, openModal: true});
      e.target.value = '';
    }
  };

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.setState({ crop });
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  getCroppedImg = (e) => {
    e.preventDefault();
    
    const crop = this.state.crop;
    if(this.imageRef && crop.width && crop.height) {  
      const image = this.imageRef;
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
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          this.setState({ croppedImageUrl: this.fileUrl });
          this.props.setImgCrop(canvas.toDataURL('image/jpeg'));
          resolve(this.fileUrl);
        }, 'image/jpeg');
      });
    }
    this.handleClose();
  }

  render() {
    const { crop, src, croppedImageUrl, openModal } = this.state;
    let texto = "Selecionar a foto";
    if(croppedImageUrl){
      texto = "Mudar a foto";
    }
    return (
    <>
      {croppedImageUrl && (
        <div style={{ marginBottom: '5px'}}>
          <img alt="Crop" style={{ width: '200px', height: '200px', borderRadius: '4px', border: '1px solid black', marginTop: '1px' }} src={croppedImageUrl} />
        </div>
      )}

      <input type="file" accept="image/*" id="inputImagem" onChange={this.onSelectFile}/>
      <label id="labelImagem" htmlFor="inputImagem">{texto}</label>

      <Modal
        className="modalFoto"
        show={openModal}
        onHide={this.handleClose}
        dialogClassName="modalFoto__dialog"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable
        centered
      >
        <Modal.Header className="modalFoto__header">
          <p className="modalFoto__text">Cortar a foto de perfil</p>
          <p className="modalFoto__link" onClick={this.handleClose}><CloseIcon/> Fechar</p>
        </Modal.Header>

        <Modal.Body>
          <div style={{display: 'block', marginBottom: '10px'}}>
            <label id="labelImagem1" htmlFor="inputImagem">Selecionar outra foto</label>
          </div>

          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              minWidth={200}
              minHeight={200}
              maxWidth={500}
              maxHeight={500}
              keepSelection={true}
              imageStyle={{maxWidth: '500px', height: 'auto'}}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button className="modalFoto__button" variant="success" onClick={this.getCroppedImg}>Definir foto de perfil</Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
}

