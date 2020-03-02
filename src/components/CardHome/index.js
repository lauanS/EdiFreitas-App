import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import './styles.scss';

export default function CardHome(props){
  const { title='', description='', footer='', urlImg='' } = props.obj;

  function formattedDescription(){
    if(description.length > 130){
      let d = description.substring(0, 130) + " [ ... ]";
      return d;
    }
    return description;    
  }

  return (
    <>
    <Card className="CardHome">
      <CardActionArea>
        <div className="CardHome-card">
          <CardMedia
            className="CardHome-media"
            image={urlImg}
            title="Contemplative Reptile"
          />
          <CardContent className="CardHome-content">
            <h2>{title}</h2>
            <p>{formattedDescription()}</p>
            <small className="text-muted">{footer}</small>
          </CardContent>
        </div>
        
      </CardActionArea>
    </Card>
    </>
  );
}