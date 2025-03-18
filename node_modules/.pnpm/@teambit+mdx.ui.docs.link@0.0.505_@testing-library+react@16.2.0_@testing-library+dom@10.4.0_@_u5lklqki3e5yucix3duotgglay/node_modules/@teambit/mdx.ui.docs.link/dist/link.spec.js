import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { expect } from 'chai';
import { LinkExample } from './link.composition';
it('should render correctly', () => {
    const { getByTestId } = render(_jsx(LinkExample, {}));
    const rendered = getByTestId('test-link');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(rendered).to.exist;
});
//# sourceMappingURL=link.spec.js.map