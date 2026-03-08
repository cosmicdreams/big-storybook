import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/html-vite';
import * as projectAnnotations from './preview';

beforeAll(async () => {
  setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
});
