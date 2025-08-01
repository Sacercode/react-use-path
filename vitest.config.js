import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    environment: 'jsdom',
    setupFiles: [],
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src'],
      exclude: ['src/**/*.test.js'],
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: './coverage'
    },
  }
})
