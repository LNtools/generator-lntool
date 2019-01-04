/**
* # paramToObj:
* convert search/hash location url to json
*/
export default function (u){
  let r = {};
  if (u){
    u = decodeURIComponent(u.replace(/\?|\#/g, '')).split(/\&/);
    u.forEach(function(c, i){
      c = c.split('=');

      let key = c[0].toLowerCase();
      let value = c[1];
      if (/^(null|false|true|[0-9]+)$/.test(value)){
        value = JSON.parse(value);
      }

      if ( key.match(/\[\]/g)){
        key = key.replace(/\[\]/g, '');

        if (!r[key]){
          r[key] = [];
        }
        r[key].push(value);
      } else {

        r[key] = value;
      }

    });
  }
  return r;
};
