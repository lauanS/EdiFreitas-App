import React from 'react';

import CardPublic from '../CardPublic';
import Loader from '../Loader';

import './styles.scss';

export default function LastestContainer(props){
  const { data, isLoading, action, errors } = props;

  return(
    <>
    {isLoading && !errors && <Loader type="dots" /> }

    {!isLoading && errors && <p style={{textAlign: 'center'}}>Ocorreu um erro ao carregar</p> }
    
    {!isLoading && !errors &&
      data.map((obj, key) => (
        <CardPublic obj={obj} action={() => {action(obj)}} key={key} />
    ))}
    </>
  );
}