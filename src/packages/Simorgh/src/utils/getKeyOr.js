import typeOf from '@/utils/typeOf';

export default (obj, key, or = undefined) => {
  if (typeOf(obj) === 'array') {
    if (key > -1 && key < obj.length) {
      return obj[key];
    }
  } else if (typeOf(obj) === 'object') {
    if (Object.hasOwnProperty.call(obj, key)) {
      return obj[key];
    }
  }
  return or;
};
