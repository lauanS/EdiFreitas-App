export function notFind(type, value){
  if(type.endsWith('a')){
    return `Nenhuma ${type} encontrada buscando por: "${value}"`;
  }
  return `Nenhum ${type} encontrada buscando por: "${value}"`;
}