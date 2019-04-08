/**
* Get url for gdoc through proxi LN
* @name  getGdocUrlCdn
* @param {string} gdocUrl - img url
*
*/

const driveObj = (gdocUrl) => {
  const pat = /\/d\/([A-Za-z\-_0-9]*)\/.+#gid=([A-Za-z\-_0-9]*)/;
  const match = gdocUrl.match(pat);
  const obj = {
    gkey: match[1],
    gid: match[2],
    gdocUrl: gdocUrl
  };
  return obj;
};

export default {

  json: (gdocUrl) => {
    const drive = driveObj(gdocUrl);
    const url = `https://olcreativa.lanacion.com.ar/dev/get_url/?key2=${drive.gkey}&output=json&gid=${drive.gid}`;
    return url;
  },

  api: (gdocUrl, opts = {}) => {
    let $opts = {
      output: 'json',
      filters: {},
      pick: null // ['nombre_columna', ...]
    };

    $opts = Object.assign($opts, opts);
    console.log($opts);
    const drive = driveObj(gdocUrl);
    const $filters = JSON.stringify($opts.filters);
    let url = `https://olcreativa.lanacion.com.ar/dev/get_url/api.php?key2=${drive.gkey}&gid=${drive.gid}&output=${$opts.output}&filters=${$filters}`;

    /* pick: toma solamente las columnas especificadas
    * ej: &pick=["nombre", "apellido"]
    * ej2: &pick=[0, 3]
    */
    if ($opts.pick) {
      const $pick = JSON.stringify($opts.pick);
      url += `&pick=${$pick}`;
    }
    return url;
  },

  driveObj: driveObj

};
