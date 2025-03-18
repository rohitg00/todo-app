/**
 * This function process incoming svg data
 * @function {(contents, filename) => string} processSvg
 * @param {string} contents - your svg. String like "<svg viewBox="..."><path d="..."/></svg>"
 * @param {string} filename - full path of your file
 */
declare const _default: {
    process: (contents: string, filename: string) => {
        code: string;
    };
};
export default _default;
