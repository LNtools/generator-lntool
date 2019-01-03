/**
* Get url for gdoc through proxi LN
* @name  getGdocUrlCdn
* @param {string} gdoc_url - img url
*
*/

const _pat = /\/d\/([A-Za-z\-\_0-9]*)\/.+\#gid\=([A-Za-z\-\_0-9]*)/;
function getUrl(gdoc_url){
    let _match = gdoc_url.match(_pat);
    let _url ='https://olcreativa.lanacion.com.ar/dev/get_url/api.php?key2={{gkey}}&output=json&gid={{gid}}';
    return _url.replace('{{gkey}}', _match[1]).replace('{{gid}}', _match[2]);
}

export default {

	json: function(gdoc_url) {
	    // let _match = gdoc_url.match(_pat);
	    // let _url ="https://olcreativa.lanacion.com.ar/dev/get_url/api.php?key2={{gkey}}&output=json&gid={{gid}}";
	    let url = getUrl(gdoc_url);
	    return url;
	}


	// api: function(gdoc_url, filter) {
	//     let _match = gdoc_url.match(_pat);
	//     let _url ="https://olcreativa.lanacion.com.ar/dev/get_url/api.php?key={{gkey}}&output=json&gid={{gid}}&filters={}";
	//     return _url.replace("{{gkey}}", _match[1]).replace("{{gid}}", _match[2]);
	// }
	
};

