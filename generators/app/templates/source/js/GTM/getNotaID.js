/** Obtiene el ID de una nota */

export default function () {
  // let reg = /^(https?)?(\:\/\/)?(www\.)?(lanacion\.com\.ar\/)([0-9]+)\-(.+)/
  let notaId = location.pathname
    .replace(/^\//, '')
    .split('-')[0];

  // console.log(`NOTA ID: ${notaId}`)
  return notaId;
}
