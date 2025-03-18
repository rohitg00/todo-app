"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domToReacts = exports.domToReact = exports.toRootElement = void 0;
const dom_to_fiber_1 = require("./dom-to-fiber");
/**
 * a function that returns the React component of a given
 * DOM node.
 * This supports React 15 and 16+.
 */
function toRootElement(element) {
    const rootFiber = (0, dom_to_fiber_1.toRootFiber)((0, dom_to_fiber_1.domToFiber)(element));
    if (!rootFiber)
        return null;
    // bubble up the DOM to find the element matching the root fiber
    for (let current = element; current; current = current.parentElement) {
        const fiberNode = (0, dom_to_fiber_1.domToFiber)(current);
        if (!fiberNode)
            return null;
        const parent = fiberNode.return;
        const isRoot = fiberNode === rootFiber || parent === rootFiber;
        if (isRoot)
            return current;
    }
    return null;
}
exports.toRootElement = toRootElement;
/** @deprecated */
function domToReact(element) {
    const components = domToReacts(element);
    return components.pop();
}
exports.domToReact = domToReact;
function domToReacts(element) {
    if (element === null)
        return [];
    const fiberNode = (0, dom_to_fiber_1.domToFiber)(element);
    const rootFiber = (0, dom_to_fiber_1.toRootFiber)(fiberNode);
    return componentsOf(rootFiber);
}
exports.domToReacts = domToReacts;
/**
 * lists components that immediately rendered this element
 */
function componentsOf(fiberNode) {
    const components = [];
    let current = fiberNode;
    while (current && current.type !== null && typeof current.type !== 'string') {
        components.push(current.type);
        current = current.return;
    }
    return components;
}
//# sourceMappingURL=dom-to-react.js.map