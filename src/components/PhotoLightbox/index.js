import React, {useState, useEffect} from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function Photo(props) {
  const [photoIndex, setPhotoIndex] = useState(props.index);
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [images, setImages] = useState(props.images);
  const {setOpen} = props;

  useEffect(() => {
    setPhotoIndex(props.index);
    setIsOpen(props.isOpen);
    setImages(props.images);
  }, [props.index, props.isOpen, props.images])

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  }
    
  return (
    <>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex].url}
          nextSrc={images.length > 1 ? images[(photoIndex + 1) % images.length].url : null}
          prevSrc={images.length > 1 ? images[(photoIndex + images.length - 1) % images.length].url : null}
          onCloseRequest={() => handleClose()}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          nextLabel="Próximo"
          prevLabel="Anterior"
          zoomInLabel="Mais zoom"
          zoomOutLabel="Menos zoom"
          closeLabel="Fechar"
        />
      )}
    </>
  );
}

