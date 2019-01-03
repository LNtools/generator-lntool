/**
OLcreativa Google TagManager handler
*/

import getNotaId from './getNotaID';

const GTM = {

  track (obj = {}) {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    window.dataLayer.push(obj);
  },

  share (socialNetwork) {
    let ev = {
      'event': 'shareItem',
      'socialNetwork': socialNetwork,
      'socialAction': 'Share'
    };

    this.track(ev);
  },

  shareWapp () {
    this.share('whatsapp');
  },

  shareFB () {
    this.share('facebook');
  },

  shareTW () {
    this.share('twitter');
  },

  like () {
    this.trackEvent('engagement', 'like');
  },

  trackEvent (eventCategory, eventAction) {
    let notaId = getNotaId();
    let ev = {
      'event': 'trackEvent',
      'eventCategory': eventCategory, // tipo de evento, ej: click
      'eventAction': eventAction,
      'eventLabel': notaId
    };

    this.track(ev);
  }

};

export default GTM;

/**
Google tag manager dentro de las notas
======================================

## Importar la clase GTM

`import GTM from @/GTM`

## Métodos:

  * Share Twitter: `GTM.shareTW()`
  * Share Facebook: `GTM.shareFB()`
  * Like: `GTM.like()`
  * Track event: `GTM.trackEvent('click', 'Registrarse')`

*/
