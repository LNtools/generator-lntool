export default function (_src) {
  let loaderPromise = new Promise((resolve, reject) => {
    let _script = document.createElement('script');
    _script.onload = function (data) {
      resolve(data);
    };

    _script.onerror = function (err) {
      reject(err);
    };

    _script.src = _src;

    document.head.appendChild(_script);
  });

  return loaderPromise;
}
