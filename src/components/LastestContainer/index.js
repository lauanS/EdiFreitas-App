import React from 'react';

import CardHome from '../CardHome';
import Loader from '../Loader';

import './styles.scss';

export default function LastestContainer(props){
  const { data, isLoading, action } = props;

  return(
    isLoading?
      <Loader type="dots" />
    :
    data.map((obj, key) => (
      <CardHome obj={obj} action={() => {action(obj)}} key={key} />
    ))

  );
}