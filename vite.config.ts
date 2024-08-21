import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Полифиллы для Node.js модулей в браузере
import { Buffer } from 'buffer';
import process from 'process';

// Устанавливаем глобальные объекты для браузера
globalThis.Buffer = Buffer;
globalThis.process = process;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Заменяем Node.js модули на браузерные полифиллы
      buffer: 'buffer/',
      process: 'process/browser',
      global: 'global/auto'
    },
  },
  define: {
    global: 'globalThis',
  },
});
