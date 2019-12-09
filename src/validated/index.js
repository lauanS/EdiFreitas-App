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

export function checkData(e, data, setData, setVali, setInva){
  let valor = e.value;
  let cont = 0;

  for(let i = 0; i < valor.length; i++){
    let char = valor.charAt(i);
    if(char === '/'){
      cont++;
    }
  }

  if(e.value.length === 2 && cont === 0 && data.length < valor.length){
    valor = e.value.concat("/");
  }
  else if(e.value.length === 5 && cont === 1 && data.length < valor.length){
    valor = e.value.concat("/");
  }
  else if(e.value.length > 10){
    valor = data;
  }
  
  setData(valor);
  console.log(valor + " o");
  cont = 0;
  let flag = false;
  let dia = "";
  let mes = "";

  for(let i = 0; i < valor.length; i++){
    let char = valor.charAt(i);
    if(!((char >= '0' && char <= '9') || (char === '/'))){
      flag = true;
    }
    if(char === '/' && cont === 0){
      cont++;
      let str1 = valor.charAt(0);
      let str2 = valor.charAt(1);
      dia = str1.concat(str2);
    }
    else if(char === '/' && cont === 1){
      cont++;
      let str1 = valor.charAt(3);
      let str2 = valor.charAt(4);
      mes = str1.concat(str2);
    }
    else if(char === '/'){
      cont++;
    }
  }
  if(cont !== 2){
    flag = true;
  }

  if(valor.length === 10 && flag === false){
    dia = parseInt(dia);
    mes = parseInt(mes);
    if(mes === 1 || mes === 3 || mes === 5 || mes === 7 || mes === 8 || mes === 10 || mes === 12){
      if(dia >= 1 && dia <= 31){
        setVali(true);
        setInva(false);
      }
      else{
        setVali(false);
        setInva(true);
      }
    }
    else if(mes === 4 || mes === 6 || mes === 9 || mes === 11){
      if(dia >= 1 && dia <= 30){
        setVali(true);
        setInva(false);
      }
      else{
        setVali(false);
        setInva(true);
      }
    }
    else if(mes === 2){
      let str1 = valor.charAt(6);
      let str2 = valor.charAt(7);
      let ano = str1.concat(str2);
      str1 = valor.charAt(8);
      str2 = valor.charAt(9);
      ano = ano.concat(str1);
      ano = ano.concat(str2);

      let bis = false;
      if ( ( ano % 4 === 0 && ano % 100 !== 0 ) || (ano % 400 === 0) ) { 
        bis = true
      } else {
        bis = false;
      }

      if(dia >= 1 && dia <= 28){
        setVali(true);
        setInva(false);
      }
      else if(bis === true && dia === 29){
        setVali(true);
        setInva(false);
      }
      else{
        setVali(false);
        setInva(true);
      }
    }
    else{
      setVali(false);
      setInva(true);
    }
  }
  else{
    setVali(false);
    setInva(true);
  }
}

export function checkCpf(e, setCpf, setVali, setInva){ 
  let flag = false

  for(let i = 0; i < e.value.length; i++){
    let char = e.value.charAt(i);
    if(!(char >= '0' && char <= '9')){
      flag = true;
    }
  }

  setCpf(e.value);
  if(e.value.length === 11 && flag === false){
    let digito = 0;
    let v1 = 0, v2 = 0, id = 8;

    let r1 = parseInt(e.value.charAt(9));
    let r2 = parseInt(e.value.charAt(10));

    for(let i = 0; i < 9; i++){
      digito = parseInt(e.value.charAt(i));
      v1 = v1 + digito * (9 - (id % 10));
      v2 = v2 + digito * (9 - ((id + 1)%10));
      id--;
    }
    v1 = (v1 % 11) % 10;
    v2 = v2 + v1 * 9;
    v2 = (v2 % 11) % 10;
    
    if(v1 === r1 && v2 === r2){
      setVali(true);
      setInva(false);
    }
    else{
      setVali(false);
      setInva(true);
    }
  }
  else{
    setVali(false);
    setInva(true);
  }
}

export function checkTelefone(e, setTelefone, setVali, setInva){ 
  let flag = false

  for(let i = 0; i < e.value.length; i++){
    let char = e.value.charAt(i);
    if(!(char >= '0' && char <= '9')){
      flag = true;
    }
  }

  setTelefone(e.value);
  if(e.value.length === 11 && flag === false){
    setVali(true);
    setInva(false);
  }
  else{
    setVali(false);
    setInva(true);
  }
}