export const IS_PROD = process.env.NODE_ENV === 'production';
export const API_BASE_URL = IS_PROD
  ? '/api/'
  : 'http://91.217.177.179:8112/api';
