export function notFind(type, value){
  if(type.endsWith('a')){
    return `Nenhuma ${type} encontrada buscando por: "${value}"`;
  }
  return `Nenhum ${type} encontrada buscando por: "${value}"`;
}

export function deleteError(){
  return `Ocorreu um erro ao excluir`;
}

export function deleteSuccess(type=""){
  if(type) {
    if(type.endsWith('a')){
      return `${type} excluída com sucesso`;
    }
    return `${type} excluído com sucesso`;;
  }
  return `Excluído com sucesso`;
}


export function updateSuccess(){
  return `Informações atualizadas`;
}

export function updateError(){
  return `Ocorreu um erro ao atualizar`;
}
export function saveError(){
  return `Ocorreu um erro ao salvar`;
}

export function saveSuccess(type=""){
  if(type) {
    if(type.endsWith('a')){
      return `${type} salva com sucesso`;
    }
    return `${type} salvo com sucesso`;;
  }
  return `Salvo com sucesso`;
}