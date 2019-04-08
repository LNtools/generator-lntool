/* eslint no-param-reassign: "off" */
/* eslint no-cond-assign: "off" */
/* eslint radix: "off" */
/**
* Fortat Number
* @name  formatNumber
* @param {int} n - Number to format
* @param {int} c - Decimal characters length
* @param {string} d - Decimal separator
* @param {string} t - Thousands separator
*
*/
export default function formatNumber (n, c = 2, d = ',', t = '.') {
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d === undefined ? '.' : d;
  t = t === undefined ? ',' : t;
  const s = n < 0 ? '-' : '';
  const i = `${parseInt(n = Math.abs(+n || 0).toFixed(c))}`;
  let j;
  j = (j = i.length) > 3 ? j % 3 : 0;
  const nn = s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t}`) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');

  return nn;
}
