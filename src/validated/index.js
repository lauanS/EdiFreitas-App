export function checkText(e, setText, setVali, setInva){
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

  setText(e.value);

  if(flag === false && e.value.length > 0){
    setVali(true);
    setInva(false);
  }
  else{
    setInva(true);
    setVali(false);
  }
}

export function checkNumber(e, setNum, setVali, setInva){
  let valor = 0;
  let flag = false

  for(let i = 0; i < e.value.length; i++){
    let char = e.value.charAt(i);
    if(!(char >= '0' && char <= '9')){
      flag = true;
    }
  }

  setNum(e.value);
  valor = e.value;
  
  if(e.value.length === 0){
    setVali(false);
    setInva(false);
  }
  else if(flag === false && valor > 0){
    setVali(true);
    setInva(false);
  }
  else{
    setInva(true);
    setVali(false);
  }
}

export function checkCamiseta(e, setTam, setVali, setInva){
  setTam(e.value);
  let valor = e.value;
  let flag = false;

  for(let i = 0; i < e.value.length; i++){
    let char = e.value.charAt(i);
    if(!(char >= '0' && char <= '9')){
      flag = true;
    }
  }
  if(e.value.length === 0){
    setVali(false);
    setInva(false);
  }
  else if(flag === false && valor > 0){
    setVali(true);
    setInva(false);
  }
  else if(e.value === "PP" || e.value === "P" || e.value === "M" || e.value === "G" || e.value === "GG" || e.value === "GGG"){
    setVali(true);
    setInva(false);
  }
  else{
    setInva(true);
    setVali(false);
  }
}