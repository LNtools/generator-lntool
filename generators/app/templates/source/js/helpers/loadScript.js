export default function loadScript (src) {
  const loaderPromise = new Promise((resolve, reject) => {
    const $script = document.createElement('script');
    $script.onload = (data) => {
      resolve(data);
    };

    $script.onerror = (err) => {
      reject(err);
    };

    $script.src = src;

    document.head.appendChild($script);
  });

  return loaderPromise;
}
