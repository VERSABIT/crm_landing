// API configuration for different environments
export const IS_PRODUCTION = import.meta.env.PROD;
export const HAS_BACKEND = !IS_PRODUCTION; // Backend only available in development

export const API_BASE_URL = IS_PRODUCTION 
  ? '' // No backend in production static deployment
  : '';

export function getApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}

export function isApiAvailable(): boolean {
  return HAS_BACKEND;
}