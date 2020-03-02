import React, { useState, useEffect } from 'react';

import './styles.scss';


export default function Feed(props){
  const { value } = props;

  return (
    <>  
      <div className="SectionTitle">
        <h1>{value}</h1>
        <hr /> 
      </div>
 
    </>
  );
}