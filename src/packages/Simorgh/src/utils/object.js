function getUniqueObjectsByValue(arr, param) {
  const newArr = [...arr];
  const seen = new Set();
  return newArr.filter((item) => {
    if (seen.has(item[param])) {
      return false;
    }
    seen.add(item[param]);
    return true;
  });
}

export { getUniqueObjectsByValue };
