/**
 * Environment variable utility functions for Vite
 */
import { ENV_DEFAULTS } from '../config/env.defaults';

export const getPublicUrl = (): string => {
  // For development, use the base URL from vite.config.ts
  return '/porfolio';
};

export const getEnvVariable = (key: string): string | undefined => {
  const envKey = `VITE_${key}`;
  // Try to get from import.meta.env first, if not available use default values
  const envValue = (import.meta.env as Record<string, string>)[envKey];
  return envValue || ENV_DEFAULTS[key as keyof typeof ENV_DEFAULTS];
};

// For backward compatibility with process.env
export const env = {
  PUBLIC_URL: getPublicUrl(),
  REACT_APP_EMAILJS_SERVICE_ID: getEnvVariable('EMAILJS_SERVICE_ID'),
  REACT_APP_EMAILJS_TEMPLATE_ID: getEnvVariable('EMAILJS_TEMPLATE_ID'),
  REACT_APP_EMAILJS_PUBLIC_KEY: getEnvVariable('EMAILJS_PUBLIC_KEY'),
}; 