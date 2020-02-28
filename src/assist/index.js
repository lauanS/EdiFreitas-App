export function idade(niver){
  if(niver === undefined){
    return 0;
  }
  let ano_aniversario = + parseInt(niver.substring(0,4)),
    mes_aniversario = + parseInt(niver.substring(5,7)),
    dia_aniversario = + parseInt(niver.substring(8,10));

  let d = new Date(),
    ano_atual = d.getFullYear(),
    mes_atual = d.getMonth() + 1,
    dia_atual = d.getDate(),

    quantos_anos = ano_atual - ano_aniversario;

  if ((mes_atual < mes_aniversario) || (mes_atual === mes_aniversario && dia_atual < dia_aniversario)) {
    quantos_anos--;
  }

  return quantos_anos < 0 ? 0 : quantos_anos;
}

export function nascimento(data){
  let ano_aniversario = + parseInt(data.substring(0,4)),
    mes_aniversario = + parseInt(data.substring(5,7)),
    dia_aniversario = + parseInt(data.substring(8,10));
    
  let meses = ["Janeiro", "Fevereiro", "Março", "Abril",	"Maio", "Junho", 	
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  let dataBR = dia_aniversario + " de " + meses[mes_aniversario-1] + " de " + ano_aniversario;
  return dataBR;
}

export function cpfFormat(cpf){
  if(cpf === undefined){
    return "";
  }
  let newCpf = cpf.substring(0,3) + "." + cpf.substring(3,6) + "." + cpf.substring(6,9)
    + "-" + cpf.substring(9,11)
  return newCpf;
};

export function formatDadosCrianca(crianca){
  let retorno = crianca.nome + "; ";
  if(crianca.sexo === "F"){
    retorno = retorno + "Menina com ";
  }
  else{
    retorno = retorno + "Menino com ";
  }
  if(idade(crianca.dataNascimento) > 1){
    retorno = retorno + idade(crianca.dataNascimento) + " anos ";
  }
  else{
    retorno = retorno + idade(crianca.dataNascimento) + " ano ";
  }
  return retorno;
}

export function desconverterData(data){
  let ano = data.substring(0,4);
  let mes = data.substring(5,7);
  let dia = data.substring(8,10);
  let conv = dia + "/" + mes + "/" + ano;
  return conv;
}

export function converterData(data){
  let dia = data.substring(0,2);
  let mes = data.substring(3,5);
  let ano = data.substring(6,10);
  let conv = ano + "-" + mes + "-" + dia;
  return conv;
}

export function converterDataFormatISO(data){
  let contador = 0;
  let aux = '';
  let ano, mes, dia;

  for(let i = 0; i < data.length; i++){
    let char = data.charAt(i);
    if(char === '-'){
      if(contador === 0){
        ano = aux;
        aux = '';
      }
      else if(contador === 1){
        mes = aux;
        aux = '';
      }
      contador++;
    }
    else if(char === 'T'){
      dia = aux;
      mes = + parseInt(mes);
      let meses = ["janeiro", "fevereiro", "março", "abril",	"maio", "junho", 	
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

      let dataFormatada = dia + " de " + meses[mes-1] + " de " + ano;
      return dataFormatada
    }
    else{
      aux = aux + char;
    }
  }
}

export function createFilename(base, date){
  const dateAsString = "" + date.getDate() + date.getMonth() + 
    date.getFullYear() + date.getHours() + 
    date.getMinutes() + date.getSeconds() + 
    date.getMilliseconds();
  return base + dateAsString;
}