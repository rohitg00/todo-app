import { jsx as _jsx } from "react/jsx-runtime";
import { Link as BaseLink } from '@teambit/base-react.navigation.link';
import styles from './link.module.scss';
export function Link(props) {
    return _jsx(BaseLink, { ...props, className: styles.link, external: true });
}
//# sourceMappingURL=link.js.map