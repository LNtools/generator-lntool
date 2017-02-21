/** global configs */

let conf = {
    app_cwd:'source/',
    dest:'build/',
    // autotuneJson:'build/data/autotune.json',
    autotuneJson:'source/data/autotune.json',
    commit: Math.floor(Date.now() / 1000)
};

module.exports.conf = conf;

module.exports.js_all = 'all.v'+conf.commit+'.min.js';

module.exports.js_all = 'all.v'+conf.commit+'.min.js';

module.exports.js_vendor = 'vendor.v'+conf.commit+'.min.js';

module.exports.css_file_min = 'all.v'+conf.commit+'.min.css';
