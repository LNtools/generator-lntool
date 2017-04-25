$(function () {
    /** Code! */

    var OL = require('./OL');


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
