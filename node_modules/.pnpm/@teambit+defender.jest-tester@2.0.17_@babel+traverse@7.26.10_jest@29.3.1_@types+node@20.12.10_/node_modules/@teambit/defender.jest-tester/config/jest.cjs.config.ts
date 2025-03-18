import baseConfig from './jest.base.config';

const cjsTransformer = require.resolve('./transformers/cjs-transformer');

const cjsTransform = {
  ...baseConfig.transform,
  '^.+\\.(js|jsx|ts|tsx|cjs)$': cjsTransformer,
};

export default { ...baseConfig, transform: cjsTransform };
