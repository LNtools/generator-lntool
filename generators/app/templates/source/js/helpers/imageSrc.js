import { version } from '@/../package.json';

export default function (sku) {
  return `https://especialess3.lanacion.com.ar/precios-claros/fotos-productos/${sku}.jpg?v${version}`;
}
