import { transform } from '@babel/core';

export const generateProcessFunc = (presets: any, plugins: any) => (src: string, filename: string) => {
  const result: any = transform(src, {
    sourceMap: 'inline',
    filename,
    presets,
    plugins,
    babelrc: false,
    configFile: false,
  } as any);

  return result || { code: src };
};
