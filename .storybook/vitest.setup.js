import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/html';
import * as projectAnnotations from './preview';

beforeAll(async () => {
  setProjectAnnotations(projectAnnotations);
});
