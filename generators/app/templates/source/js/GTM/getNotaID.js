/** Obtiene el ID de una nota */
export default function (path = location.pathname) {
  let match = path.match(/nid([0-9]+)/)
  const notaId = match ? match[1] : ''
  // console.log(`NOTA ID: ${notaId}`)
  return notaId;
}
