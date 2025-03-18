"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
/**
 * This function build module.
 *
 * Changes by https://github.com/ChromeQ:
 * - module.exports.default = ${functionName};
 * + module.exports.__esModule = true;
 * + module.exports.default = '${pathname}';
 *
 * Object props is a more extensible solution when we have a lot of props
 */
const buildModule = ({ filename, functionName, pathname }) => {
    return `
      const React = require('react');
      const ${functionName} = (props) =>
      {
      return React.createElement('svg', {
        ...props,
        'data-jest-file-name': '${pathname}',
        'data-jest-svg-name': '${filename}',
        'data-testid': '${filename}'
      });
      }
      module.exports.__esModule = true;
      module.exports.default = '${pathname}';
      module.exports.ReactComponent = ${functionName};
  `;
};
/**
 * This function creates a function name
 */
const createFunctionName = (base) => {
    const words = base.split(/\W+/);
    /* here I refactored the code a bit and replaced "substr" (Deprecated) with "substring" */
    return words.reduce((identifier, word) => identifier + word.substring(0, 1).toUpperCase() + word.substring(1), '');
};
/**
 * This function process incoming svg data
 * @function {(contents, filename) => string} processSvg
 * @param {string} contents - your svg. String like "<svg viewBox="..."><path d="..."/></svg>"
 * @param {string} filename - full path of your file
 */
exports.default = {
    process: (contents, filename) => {
        const parts = (0, path_1.parse)(filename);
        if (parts.ext.toLowerCase() === '.svg') {
            const functionName = createFunctionName(parts.name);
            const transformed = buildModule({
                filename: parts.name,
                functionName,
                pathname: parts.base,
            });
            return {
                code: transformed,
            };
        }
        // return contents;
        // for Jest28 it has to return an object with `code`
        return { code: contents };
    }
};
//# sourceMappingURL=svg-transformer.js.map