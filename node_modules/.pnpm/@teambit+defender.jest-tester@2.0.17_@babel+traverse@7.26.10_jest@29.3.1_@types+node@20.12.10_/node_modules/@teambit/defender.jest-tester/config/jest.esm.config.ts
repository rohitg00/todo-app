import baseConfig from './jest.base.config';

const esmTransformer = require.resolve('./transformers/esm-transformer');

const esmTransform = {
  ...baseConfig.transform,
  '^.+\\.(js|jsx|ts|tsx)$': esmTransformer,
};

export default {
  ...baseConfig,
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
  transform: esmTransform,
};