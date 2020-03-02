import React from 'react';

import CardHome from '../CardHome';
import Loader from '../Loader';

// import { notFind, deleteError, deleteSuccess} from "../../assist/feedback";
// import { desconverterData, getUrlBase } from "../../assist/";

import './styles.scss';

export default function LastestContainer(props){
  const { data, isLoading } = props;

  return(
    isLoading?
      <Loader type="dots" />
    :
    data.map((obj, key) => (
      <CardHome obj={obj} key={key} />
    ))

  );
}