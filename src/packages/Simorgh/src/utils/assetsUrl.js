export function makeAssetsUrl(url) {
  const prefix = window.__ASSETS_PREFIX__;

  if (prefix) {
    return `${prefix}${url.startsWith('/') ? url : `/${url}`}`;
  }

  return url;
}
