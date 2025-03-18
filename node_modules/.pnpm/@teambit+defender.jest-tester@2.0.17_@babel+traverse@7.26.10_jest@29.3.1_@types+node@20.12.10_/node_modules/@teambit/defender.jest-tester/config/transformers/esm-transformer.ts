/* eslint-disable global-require */
/* eslint-disable import/order */

import { basePlugins } from './base-transformer-plugins';
import { basePresets } from './base-transformer-presets';
import { generateProcessFunc } from './base-transformer-process';

export const esmPresets = [
  ...basePresets,
  [
    require('@babel/preset-env'),
    {
      modules: false,
      targets: {
        node: 16,
      },
      // useBuiltIns: 'usage',
      // corejs: 3,
    },
  ],
];

export const esmPlugins = basePlugins;

export default { process: generateProcessFunc(esmPresets, esmPlugins) };