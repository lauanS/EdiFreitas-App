import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { postImagem, postAlbum } from "../../services";

export default function EditorDeTexto(props){
  let editorWidth = undefined;

  const album = useRef();

  if(!props.isUpdate){
    const screenWidth = window.innerWidth; 
    if(screenWidth <= 960){
      editorWidth = screenWidth - 100;
    }
  }

  return (
    <Editor
      apiKey='j8acg42y8znry1o8lqvyi8m51wk1qnsawu2c5haxb2j98trm'
      plugins="wordcount image imagetools"
      
      /* opções de inicialização do editor*/
      init = {{
        height: 300,
        width: editorWidth,

        menubar: "",

        /* Opções disponiveis na barra de ferramentas */
        toolbar: 'undo redo | formatselect | ' +
        ' bold italic backcolor | link image | alignleft aligncenter ' +
        ' alignright alignjustify | bullist numlist outdent indent ',
        imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",


        images_upload_handler: async function (blobInfo, success, failure){
          // Verifica se não temos nenhum album para as fotos
          if(!album.current){
            // Cria um novo álbum
            try {
              const responseAlbum = await postAlbum({nome: "albumParaNoticia"});

              if(responseAlbum){
                album.current = responseAlbum.data;
              }
            } catch (error) {
              console.log("Erro na criação do álbum")
              console.log(error);  
              failure("Erro");  
            }
          }
          try {
            // Obtendo a img na base64
            let imgBase64;

            const reader = new FileReader();
            reader.onload = async () => {
              imgBase64 = reader.result

               // Criando o obj img para salvar no banco
              const img = {
                iBase: imgBase64,
                filename: blobInfo.filename(),
                album: album.current.id
              }
    
              console.log(img)
              const responseImg = await postImagem(img);
              const urlImg = responseImg.data.url;
              success(urlImg)
            };
            
            reader.readAsDataURL(blobInfo.blob());

           
          } catch (error) {
            console.log("Erro ao salvar a imagem");
            console.log(error);
            failure("Erro");
          }

         

        },

        // /* we override default upload handler to simulate successful upload*/
        // images_upload_handler: function (blobInfo, success, failure) {
        //   setTimeout(function () {
        //     /* no matter what you upload, we will turn it into TinyMCE logo :)*/
        //     success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
        //   }, 2000);
        // }

      }}
      value={props.text}
      onEditorChange={props.handleChange}
      />
  );
  

}