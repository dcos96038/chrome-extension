export function stringContainOnlyNumbers(str: string) {
  const regex = /^[0-9]+$/
  return regex.test(str)
}
const verifyCuit = (cuit: string) => {
  if (cuit.length !== 11) {
    return false;
  }

  let acumulado = 0;
  let digitos = cuit.split('');
  let digito = parseInt(digitos.pop());

  for (let i = 0; i < digitos.length; i++) {
    acumulado += Number(digitos[9 - i]) * (2 + (i % 6));
  }

  let verif = 11 - (acumulado % 11);
  if (verif === 11) {
    verif = 0;
  } else if (verif === 10) {
    verif = 9;
  }

  return digito === verif;
};

export function parseInputValue (str: string) {
  if(verifyCuit(str)) {
    return str.replaceAll("-", "")
  }

  return str
}