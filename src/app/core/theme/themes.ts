import { Theme } from './theme.model';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--color-primary': '#2563eb',
    '--color-secondary': '#4b5563',
    '--color-accent': '#3b82f6',
    '--color-background': '#f3f4f6',
    '--color-surface': '#ffffff',
    '--color-text': '#111827',
    '--color-text-secondary': '#6b7280',
    '--color-border': '#e5e7eb',
    '--color-error': '#ef4444',
    '--color-success': '#22c55e',
    '--color-warning': '#f59e0b'
  }
};

export const darkTheme: Theme = {
  name: 'dark',
  properties: {
    '--color-primary': '#3b82f6',
    '--color-secondary': '#9ca3af',
    '--color-accent': '#60a5fa',
    '--color-background': '#111827',
    '--color-surface': '#1f2937',
    '--color-text': '#f9fafb',
    '--color-text-secondary': '#d1d5db',
    '--color-border': '#374151',
    '--color-error': '#f87171',
    '--color-success': '#4ade80',
    '--color-warning': '#fbbf24'
  }
};