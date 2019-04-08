export default function (arr, key) {
  arr.sort((pA, pB) => {
    if (pA[key] > pB[key]) {
      return 1;
    }
    if (pA[key] < pB[key]) {
      return -1;
    }

    return 0;
  });

  return arr;
}
