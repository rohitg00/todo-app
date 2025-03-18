import { basename } from 'path';

export default {
  process: (_sourceText: string, sourcePath: string) => {
    return {
      code: `module.exports = ${JSON.stringify(basename(sourcePath))};`,
    };
  }
}