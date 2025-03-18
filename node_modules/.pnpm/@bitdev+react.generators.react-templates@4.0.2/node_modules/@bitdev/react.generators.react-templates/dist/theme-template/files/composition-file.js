"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeCompositionFile = themeCompositionFile;
function themeCompositionFile(context) {
    return {
        relativePath: `${context.name}.composition.tsx`,
        content: `import { ${context.namePascalCase} } from './${context.name}.js';

export const Basic${context.namePascalCase} = () => {
  return <${context.namePascalCase}>hello world!</${context.namePascalCase}>;
};

export const ThemeUsage = () => {
  return (
    <${context.namePascalCase}>
      <div style={{ backgroundColor: 'var(--background-color)' }}>
        theme example content
      </div>
    </${context.namePascalCase}>
  );
};        
`
    };
}
//# sourceMappingURL=composition-file.js.map