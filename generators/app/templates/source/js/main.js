$(function () {
    /** Code! */

    var OL = require('OL');


    OL.init()
        .loader.hide();




    /**
    *
    * Update data from autotune live preview
    *
    */
    // OL.pymChild.onMessage('updateData', function(data) {
    //     data = JSON.parse(data);
    //     updateDataSet(data);

    // });

    // function updateDataSet(_data){
    //     /** update autotune app */
    //     console.info(_data);
    // }

});


Number.prototype.format = function(c, d, t){
    var n = this;
    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;
    var s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    var nn = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    return nn;
};
