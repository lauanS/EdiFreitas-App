import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Form, Row, Col} from 'react-bootstrap';


export default function DadosNoticia(props){
  const { title, subtitle, setTitle, setSubtitle, tags, setTags } = props;
  const { setInvalidatedTitle, setInvalidatedSubtitle } = props;
  const { invalidatedTitle, invalidatedSubtitle } = props;

  function checkField(content, setInvalidated){
    console.log("content: ", content);
    console.log("content.length: ", content.length);
    console.log("setInvalidated: ", invalidatedTitle);

    if(content.length > 0){
      setInvalidated(false);
    }
    else{
      setInvalidated(true);
    }
  }

  const handleTitleChange = e => {
    const content = e.target.value;
    setTitle(content);
    checkField(content, setInvalidatedTitle)
  }

  const handleSubtitleChange = e => {
    const content = e.target.value;
    setSubtitle(content);
    checkField(content, setInvalidatedSubtitle)
  }

  const handleTagsChange = e => {
    const content = e.target.value;
    setTags(content);
  }

  return (
    <>
      <Form.Group as={Row} controlId="formGroupTitle">
        <Form.Label column sm={2}>
          Título da notícia *
        </Form.Label>
        <Col>
          <Form.Control 
            required
            value={title}
            onChange={handleTitleChange} 
            isInvalid={invalidatedTitle}
            type="text" 
          />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupSubtitle">
        <Form.Label column sm={2}>
          Subtítulo *
        </Form.Label>
        <Col>
          <Form.Control 
            required
            as="textarea" 
            rows="2" 
            value={subtitle}
            onChange={handleSubtitleChange}
            isInvalid={invalidatedSubtitle}
          />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupTags">
        <Form.Label column sm={2}>
          Tags
        </Form.Label>
        <Col>
          <Form.Control
            rows="2" 
            value={tags}
            onChange={handleTagsChange}
          />     
        </Col>
      </Form.Group>
    </>
  );
}
