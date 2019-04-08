/** Este path es reemplazado por la url absoluta del proyecto en S3
* NO-TOCAR
*/

// import { formatNumber } from './helpers';

window.PATH_APP = '';
/** NO-TOCAR-END */

window.onload = function () {
  /** resize app */
  let doit;
  window.onresize = function () {
    clearTimeout(doit);
    doit = setTimeout(() => { console.log('resize app'); }, 200);
  };
};

// pymChild = new pym.Child();
// pymChild.sendHeight();

/** FIX PROMISE CROSSBROWSER */
// // import Promise from 'promise-polyfill';

// // To add to window
// if (!window.Promise) {
//   window.Promise = Promise;
// }
