import React from 'react';

import CardPublic from '../CardPublic';
import Loader from '../Loader';

import './styles.scss';

export default function LastestContainer(props){
  const { data, isLoading, action } = props;

  return(
    isLoading?
      <Loader type="dots" />
    :
    data.map((obj, key) => (
      <CardPublic obj={obj} action={() => {action(obj)}} key={key} />
    ))

  );
}