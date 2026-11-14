// src/constants/theme.ts
import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Tus colores base originales
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    // Identidad de marca (Machote comercial)
    primary: '#1e3a8a',      // Azul institucional (barra superior, botones)
    primaryDark: '#172554',  // Azul profundo para hover/contraste
    accent: '#d97706',       // Dorado/Ámbar para acentos
    border: '#e2e8f0',       // Líneas divisorias sutiles
    textOnPrimary: '#ffffff',// Texto blanco sobre la barra azul
  },
  dark: {
    // Tus colores base originales en modo oscuro
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    // Identidad de marca adaptada a modo oscuro
    primary: '#1e40af',
    primaryDark: '#172554',
    accent: '#f59e0b',
    border: '#334155',
    textOnPrimary: '#ffffff',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Layout = {
  radius: 8,
  headerHeight: 64,
  bottomTabInset: Platform.select({ ios: 50, android: 80 }) ?? 0,
  maxContentWidth: 1100, // Ampliado para que el portal web luzca moderno
} as const;