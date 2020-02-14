import React, {useState, useEffect} from 'react';
import {getAlbum, getImagem} from '../../services';

export default function ListarAlbum(){
  const [albuns, setAlbuns] = useState([]);
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    getAlbum()
    .then(res => {
      setAlbuns(res.data);
    })
    .catch(() => {
      
    });
  }, []);

  const handleImages = (e, id) => {
    getImagem(id)
    .then(res => {
      setFotos(res.data);
    })
    .catch(() => {

    });
  }

  return(
    <>
    

    {albuns.length > 0 ? albuns.map((album, index) => 
    <div key={index}>
      <button onClick={e => handleImages(e, album.id)}>{album.nome}</button>
    </div>
    )
    :
    ''}
    {fotos.length > 0 ? fotos.map((foto, index) => 
    <div key={index}>
      <img src={foto.url} crop="fotos" alt="fotos"/>
    </div>
    )
      :
      ''
    }
    </>
  );
}