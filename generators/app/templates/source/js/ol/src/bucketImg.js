/**
* Resize image from LN bucket
* @name  bucketImg
* @param {string} _src - img url
* @param {string} _w - width img
*
*/
module.exports = function (_src, _w){
    var w = _w ? "w"+_w : "";
    var patBucket = /bucket[0-9]?\.glanacion(.+)?\.(jpg|png)/;
    var patReplacer = /\.(jpg|png)/;
    var isBucket = patBucket.test(_src);

    _src = isBucket ? _src.replace(patReplacer, w+"\.$1") : _src;

    return _src;
};
