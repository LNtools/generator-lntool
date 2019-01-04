/**
* Resize image from LN bucket
* @name  bucketImg
* @param {string} _src - img url
* @param {string} _w - width img
*
*/
export default function (_src, _w){

  let w = _w ? 'w'+_w : '';
  let patBucket = /bucket[0-9]?\.glanacion(.+)?\.(jpg|png)/;
  let patReplacer = /\.(jpg|png)/;
  let isBucket = patBucket.test(_src);

  _src = isBucket ? _src.replace(patReplacer, w+'\.$1') : _src;
  if (!!_src) {
    _src = _src.replace('http:', 'https:');
  }

  return _src;
};
