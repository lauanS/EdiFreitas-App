import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.scss';

export default function LoadButton(props){
  const { type, variant, className, size, as, onClick } = props;

  const  { isLoading } = props; 
  return (
    <>
  
    <Button 
      size={size}
      as={as}
      className={className} 
      variant={variant} 
      type={type} 
      onClick={onClick}
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
