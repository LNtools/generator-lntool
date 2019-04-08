/** Replace coma decimal by dot and return an object type Number */
export default function (str) {
  let n = str.replace(',', '.');
  n = +n;

  return n;
}
