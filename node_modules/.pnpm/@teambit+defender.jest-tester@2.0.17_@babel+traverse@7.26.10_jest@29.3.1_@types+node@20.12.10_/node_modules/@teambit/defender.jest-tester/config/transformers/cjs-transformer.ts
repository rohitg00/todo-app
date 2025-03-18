/* eslint-disable import/order */
/* eslint-disable global-require */
import { generateProcessFunc } from './base-transformer-process';
import { basePlugins } from './base-transformer-plugins';
import { basePresets } from './base-transformer-presets';

export const cjsPresets = [
  ...basePresets,
  [
    require('@babel/preset-env'),
    {
      targets: {
        node: 16,
      },
      // useBuiltIns: 'usage',
      // corejs: 3,
    },
  ],
];

export const cjsPlugins = [
  [require('@babel/plugin-transform-modules-commonjs')],
  ...basePlugins,
];

export default { process: generateProcessFunc(cjsPresets, cjsPlugins) };