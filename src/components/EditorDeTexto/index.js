import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorDeTexto() {
  const handleEditorChange = e => {
    console.log('Content was updated:', e.target.getContent());
  };

  return (
    <Editor
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      onChange={this.handleEditorChange}
    />
  );

}