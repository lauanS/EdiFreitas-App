import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.scss';

export default function ButtonSave(props){

  const  { isLoading } = props; 
  return (
    <>
  
    <Button 
      className={"ButtonSave " + props.className} 
      variant="success" 
      type="submit" 
      disabled={isLoading}
    >
      {isLoading? 
        <CircularProgress size={24} color="inherit" />
      :
        props.children
      }
    </Button>


    </>
  );
}
