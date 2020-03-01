//Calcula a idade
//Entrada: aaaa/mm/dd
//Saida: a idade
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

//Converte a data em uma string
//Entrada: aaaa/mm/dd
//Saida: 'dia' de 'mes' de 'ano'
export function nascimento(data){
  let ano_aniversario = + parseInt(data.substring(0,4)),
    mes_aniversario = + parseInt(data.substring(5,7)),
    dia_aniversario = + parseInt(data.substring(8,10));
    
  let meses = ["Janeiro", "Fevereiro", "Março", "Abril",	"Maio", "Junho", 	
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  let dataBR = dia_aniversario + " de " + meses[mes_aniversario-1] + " de " + ano_aniversario;
  return dataBR;
}

//Formatar cpf
//Entrada: 40510036805
//Saida: 405.100.368-05
export function cpfFormat(cpf){
  if(cpf === undefined){
    return "";
  }
  let newCpf = cpf.substring(0,3) + "." + cpf.substring(3,6) + "." + cpf.substring(6,9)
    + "-" + cpf.substring(9,11)
  return newCpf;
};

//Formatar dado da criança
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

//Entrada: aaaa/mm/dd
//Saida: dd/mm/aaaa
export function desconverterData(data){
  let ano = data.substring(0,4);
  let mes = data.substring(5,7);
  let dia = data.substring(8,10);
  let conv = dia + "/" + mes + "/" + ano;
  return conv;
}

//Entrada: dd/mm/aaaa
//Saida: aaaa/mm/dd
export function converterData(data){
  let dia = data.substring(0,2);
  let mes = data.substring(3,5);
  let ano = data.substring(6,10);
  let conv = ano + "-" + mes + "-" + dia;
  return conv;
}

//Entrada: 2017-09-08T15:25:53Z
//Saida: 08 de setembro de 2017
export function desconverterDataFormatISO(data){
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

//Entrada: aaaa/mm/dd
//Saida: Sab, 29 de fev. de 2020
export function dateFullFormat(data){
  let ano = + parseInt(data.substring(0,4)),
    mes = + parseInt(data.substring(5,7)),
    dia = + parseInt(data.substring(8,10));
  
  let diaSemana = new Date(`${mes} ${dia}, ${ano} 15:15:30`).getDay();

  let meses = ["jan.", "fev.", "mar.", "abr.",	"maio", "jun.", 	
    "jul.", "ago.", "set.", "out.", "nov.", "dez."];

  let semana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  let dataString = semana[diaSemana] + ", " + dia + " de " + meses[mes-1] + " de " + ano;

  return dataString;
}