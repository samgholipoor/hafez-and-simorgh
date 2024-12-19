export default (content) => {
  try {
    return navigator.clipboard.writeText(content);
  } catch (_e) {
    // eslint-disable-next-line no-alert
    window.prompt('Press Ctrl+C to Copy', content);
    return Promise.resolve();
  }
};
