import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Form, Row, Col} from 'react-bootstrap';


export default function DadosNoticia(props){
  const { title, subtitle, setTitle, setSubtitle, tags, setTags } = props;

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }

  const handleSubtitleChange = e => {
    setSubtitle(e.target.value);
  }

  const handleTagsChange = e => {
    setTags(e.target.value);
  }

  return (
    <>
      <Form.Group as={Row} controlId="formGroupTitle">
        <Form.Label column sm={2}>
          Título da notícia
        </Form.Label>
        <Col>
          <Form.Control 
            value={title}
            onChange={handleTitleChange} 
            type="text" 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupSubtitle">
        <Form.Label column sm={2}>
          Subtítulo
        </Form.Label>
        <Col>
          <Form.Control 
            as="textarea" 
            rows="2" 
            value={subtitle}
            onChange={handleSubtitleChange}
          />
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
