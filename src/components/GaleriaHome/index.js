import React, { useEffect, useState } from 'react';

import {Row} from 'react-bootstrap';
import Loader from '../Loader';
import CardAlbum from '../CardAlbum';
// import { notFind, deleteError, deleteSuccess} from "../../assist/feedback";
// import { desconverterData, getUrlBase } from "../../assist/";

import './styles.scss';
import { getAlbumHome } from '../../services';

export default function GaleriaHome(props){
  const { data, isLoading, action } = props;
  const [albuns, setAlbuns] = useState([]);

  useEffect(() => {
    async function load(){
      try {
        const response = await getAlbumHome();
        if(response.data){
          setAlbuns(response.data);
        }        
      } catch (error) {
        console.log(error);
      }
      
    }
    load();
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