export function checkText(e, text, setText, setVali, setInva){
  let nome = "";
  let flag = false;
  for(let i = 0; i < e.value.length; i++){
    let char = e.value.charAt(i);
    if( !(char >= 'a' && char <= 'z') && !(char >= 'A' && char <= 'Z') && char !== ' '
        && char !== 'ã' && char !== 'á' && char !== 'â' && char !=='à' 
        && char !== 'ẽ' && char !== 'é' && char !== 'ê' 
        && char !== 'ĩ' && char !== 'í' && char !== 'î'
        && char !== 'õ' && char !== 'ó' && char !== 'ô'
        && char !== 'ũ' && char !== 'ú' && char !== 'û' && char !== 'ç'){
      flag = true;
    }
    
  }

  if(text.length > e.value.length){
    setText(e.value);
    nome = e.value;
  } else if(flag){
    setText(text);
    nome = text;
  } else{
    setText(e.value);
    nome = e.value;
  }

  if(nome.length > 0){
    setVali(true);
    setInva(false);
  }
  else{
    setInva(true);
    setVali(false);
  }
}

export function checkNumber(e, number, setNumber, setVali, setInva){
  let flag = false;
  let valor = 0;

  for(let i = 0; i < e.value.length; i++){
    let char = e.value.charAt(i);
    if(!(char >= '0' && char <= '9')){
      flag = true;
    }
  }

  if(number.length > e.value.length){
    setNumber(e.value);
    valor = e.value;
  } else if(flag){
    setNumber(number);
    valor = number;
  } else{
    setNumber(e.value);
    valor = e.value;
  }

  if(valor > 0){
    setVali(true);
    setInva(false);
  }
  else{
    setInva(true);
    setVali(false);
  }
}