const ifIsIE = (cb) => {
  if (
    navigator.appVersion.toUpperCase().indexOf('MSIE') !== -1 ||
    navigator.appVersion.toUpperCase().indexOf('TRIDENT') !== -1 ||
    navigator.appVersion.toUpperCase().indexOf('EDGE') !== -1
  ) {
    console.info('IS IE!');
    cb();
  }
};

export default ifIsIE;
