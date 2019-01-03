/**
* Fortat Number
* @name  formatNumber
* @param {int} n - Number to format
* @param {int} c - Decimal characters length
* @param {string} d - Decimal separator
* @param {string} t - Thousands separator
*
*/

export default function formatNumber(n, c, d, t){

    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d === undefined ? '.' : d;
    t = t === undefined ? ',' : t;
    let s = n < 0 ? '-' : '',
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '',
    j = (j = i.length) > 3 ? j % 3 : 0;
    let nn = s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');

    return nn;

};
