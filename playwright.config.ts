import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    projects: [
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 7'] },
        },
        {
            name: 'Desktop Chrome',
            use: { ...devices['Desktop Chrome'] },
        }
    ]
})