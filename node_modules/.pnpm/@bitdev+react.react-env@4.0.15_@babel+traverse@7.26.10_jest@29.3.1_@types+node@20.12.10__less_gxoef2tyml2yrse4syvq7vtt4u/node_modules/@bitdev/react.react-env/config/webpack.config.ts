import type { WebpackConfigMutator } from '@teambit/webpack';

// export default (configMutator: WebpackConfigMutator): WebpackConfigMutator =>
//   configMutator;

export const webpackTransformer = (
  configMutator: WebpackConfigMutator
): WebpackConfigMutator => configMutator;