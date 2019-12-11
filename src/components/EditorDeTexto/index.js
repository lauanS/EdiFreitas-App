import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorDeTexto(props){

  const handleEditorChange = e => {
    console.log('Content was updated in react function:', e.target.getContent());
    props.handleChange(e);
  }
 
  return (
    <Editor
      apiKey='j8acg42y8znry1o8lqvyi8m51wk1qnsawu2c5haxb2j98trm'
      plugins="wordcount image imagetools"

      /* opções de inicialização do editor*/
      init = {{
        /* Opções disponiveis na barra de ferramentas */
        toolbar: 'undo redo | formatselect | ' +
        ' bold italic backcolor | link image | alignleft aligncenter ' +
        ' alignright alignjustify | bullist numlist outdent indent |' +
        ' removeformat | help',
        imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",


        /* Funcao para pegar uma imagem armazenada localmente */
        
        /* enable title field in the Image dialog*/
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,
        /*
          URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
          images_upload_url: 'postAcceptor.php',
          here we add custom filepicker only to Image dialog
        */
        file_picker_types: 'image',
        //file_picker_types: 'image', (repetido)
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
      
          /*
            Note: In modern browsers input[type="file"] is functional without
            even adding it to the DOM, but that might not be the case in some older
            or quirky browsers like IE, so you might want to add it to the DOM
            just in case, and visually hide it. And do not forget do remove it
            once you do not need it anymore.
          */
      
          input.onchange = function () {
            var file = this.files[0];
      
            var reader = new FileReader();
            reader.onload = function () {
              /*
                Note: Now we need to register the blob in TinyMCEs image blob
                registry. In the next release this part hopefully won't be
                necessary, as we are looking to handle it internally.
              */
              var id = 'blobid' + (new Date()).getTime();
              /* Trocar o this por tinymce quando importar corretamente */
              var blobCache =  Editor.editorUpload.blobCache;
              var base64 = reader.result.split(',')[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
      
              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };
          input.click();
        }
      }}
      onChange={handleEditorChange}
      />
  );
  

}