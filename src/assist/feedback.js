export function notFind(type, value){
  if(type.endsWith('a')){
    return `Nenhuma ${type} encontrada buscando por: "${value}"`;
  }
  return `Nenhum ${type} encontrada buscando por: "${value}"`;
}

export function deleteError(type=""){
  return `Ocorreu um erro ao deletar`;
}

export function deleteSucess(type=""){
  if(isEmpty(type)) {
    if(type.endsWith('a')){
      return `${type} apagada com sucesso`;
    }
    return `${type} apagado com sucesso`;;
  }
  return `Apagado com sucesso`;
}