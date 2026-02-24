import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        storybookTest({
            configDir: path.join(dirname, '.storybook'),
        }),
    ],
    test: {
        name: 'storybook',
        browser: {
            enabled: true,
            instances: [
                {
                    browser: 'chromium',
                },
            ],
            provider: playwright(),
            headless: true,
        },
        setupFiles: [path.join(dirname, '.storybook/vitest.setup.js')],
    },
});
