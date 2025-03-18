"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeStyles = themeStyles;
function themeStyles(context) {
    return {
        relativePath: `${context.name}.module.scss`,
        content: `
.${context.nameCamelCase} {
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--background-color);
}
`
    };
}
//# sourceMappingURL=theme-styles.js.map