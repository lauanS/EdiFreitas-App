import React, { useEffect, useState, useRef } from 'react';

import Loader from '../Loader';
import CardAlbum from '../CardAlbum';

import { getAlbumHome } from '../../services';

import './styles.scss';

export default function GaleriaHome(props){
  const { isLoading } = props;
  const [albuns, setAlbuns] = useState([]);

  const mounted = useRef(true);

  useEffect(() => {
    async function load(){
      try {
        const response = await getAlbumHome();
        if(response.data && mounted.current){
          setAlbuns(response.data);
        }        
      } catch (error) {
        console.log(error);
      }
      
    }
    load();

    return () => {mounted.current = false}
  }, []);

  

  return(
    isLoading?
      <Loader type="dots" />
    :
    <>
    <div className="GaleriaHome__row">
      {albuns.map((album, key) => (
        <CardAlbum album={album} key={key} />
      ))}
    </div>
    </>

  );
}