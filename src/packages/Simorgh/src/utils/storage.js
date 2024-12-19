export const saveToStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const removeFromStorage = (key) => localStorage.removeItem(key);

export const getFromStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (_e) {
    return null;
  }
};
