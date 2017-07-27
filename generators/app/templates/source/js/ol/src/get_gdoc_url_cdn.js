/**
* Get url for gdoc through proxi LN
* @name  getGdocUrlCdn
* @param {string} gdoc_url - img url
*
*/
module.exports = function(gdoc_url) {
    var _pat = /\/d\/([A-Za-z\-\_0-9]*)\/.+\#gid\=([A-Za-z\-\_0-9]*)/;
    var _match = gdoc_url.match(_pat);
    var _url ="http://olcreativa.lanacion.com.ar/dev/get_url/?key2={{gkey}}&output=json&gid={{gid}}";
    return _url.replace("{{gkey}}", _match[1]).replace("{{gid}}", _match[2]);
};
