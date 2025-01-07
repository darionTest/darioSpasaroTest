import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'], // Usa la configuración predeterminada de Chrome
        headless: true,
        viewport: { width: 1280, height: 720 },
        baseURL: 'http://localhost:3100/',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'], // Usa la configuración predeterminada de Firefox
        headless: true,
        viewport: { width: 1280, height: 720 },
        baseURL: 'http://localhost:3100/',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
  ],
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});
