"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = void 0;
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const react_dom_1 = require("@floating-ui/react-dom");
const frame_module_scss_1 = __importDefault(require("./frame.module.scss"));
/** frame padding around the target */
const MARGIN_FROM_TARGET = +frame_module_scss_1.default.offset || 6; // setting fallback 6, for tests
/** min. distance from the edge of the screen. */
const MARGIN_FROM_DOC_EDGE = 0;
const overflowParameters = { rootBoundary: 'document', padding: MARGIN_FROM_DOC_EDGE };
const SHIFT_POSITIVE = 'shiftPositive';
const HAS_RESIZE_OBSERVER = typeof window !== 'undefined' && !!window.ResizeObserver;
function Frame({ targetRef, watchMotion, className, stylesClass = frame_module_scss_1.default.overlayBorder, style }) {
    var _a;
    const dimensionRef = (0, react_1.useRef)({ width: 0, height: 0 });
    const { x, y, strategy, reference, floating, update, refs, middlewareData } = (0, react_dom_1.useFloating)({
        placement: 'bottom-start',
        middleware: [
            // replace dimensions from previous iterations with the target's size
            // this is only the measured size, not yet the applied size
            {
                name: 'align-to-target',
                fn({ rects }) {
                    rects.floating = Object.assign(Object.assign({}, rects.floating), { width: rects.reference.width + 2 * MARGIN_FROM_TARGET, height: rects.reference.height + 2 * MARGIN_FROM_TARGET });
                    return {};
                },
            },
            // reposition x,y, to the top of the reference
            (0, react_dom_1.offset)(({ rects }) => -rects.reference.height),
            // offset the frame by its extra padding
            (0, react_dom_1.offset)(() => ({ mainAxis: -MARGIN_FROM_TARGET, crossAxis: -MARGIN_FROM_TARGET })),
            // pushes the frame into the document. Similar to shift(), but only pushes when coods are negative
            {
                name: 'shiftPositive',
                fn: (args) => __awaiter(this, void 0, void 0, function* () {
                    const overflow = yield (0, react_dom_1.detectOverflow)(args, overflowParameters);
                    const nextCoords = {
                        x: overflow.left > 0 ? args.x + overflow.left : args.x,
                        y: overflow.top > 0 ? args.y + overflow.top : args.y,
                    };
                    const shiftAmount = {
                        x: nextCoords.x - args.x,
                        y: nextCoords.y - args.y,
                    };
                    return Object.assign(Object.assign({}, nextCoords), { data: shiftAmount });
                }),
            },
            // size also applies overflow detection via width and height
            (0, react_dom_1.size)({
                // apply overflow detection in reference to the document
                rootBoundary: 'document',
                padding: MARGIN_FROM_DOC_EDGE,
                apply({ elements, rects, availableHeight, availableWidth, middlewareData }) {
                    const shift = middlewareData[SHIFT_POSITIVE] || { x: 0, y: 0 };
                    const paddingX = 2 * MARGIN_FROM_TARGET - shift.x;
                    const paddingY = 2 * MARGIN_FROM_TARGET - shift.y;
                    const dimensions = {
                        width: rects.reference.width + paddingX,
                        height: rects.reference.height + paddingY,
                        maxWidth: availableWidth,
                        maxHeight: availableHeight,
                    };
                    // per floating-ui docs, apply styles directly during apply()
                    Object.assign(elements.floating.style, dimensions);
                    // also store in reference, so react renders will have the same value
                    dimensionRef.current = dimensions;
                },
            }),
            (0, react_dom_1.hide)({ strategy: 'referenceHidden' }),
        ],
    });
    // set target as floating reference
    (0, react_1.useLayoutEffect)(() => {
        reference(targetRef.current);
    }, [targetRef.current]);
    // automatically update on scroll, resize, etc.
    // `watchMotion` will trigger continuous updates using animation frame
    (0, react_1.useEffect)(() => {
        if (!refs.reference.current || !refs.floating.current || !HAS_RESIZE_OBSERVER)
            return () => { };
        return (0, react_dom_1.autoUpdate)(refs.reference.current, refs.floating.current, update, { animationFrame: watchMotion });
    }, [refs.reference.current, refs.floating.current, update, watchMotion]);
    // could check if x !== null
    const isReady = !((_a = middlewareData.hide) === null || _a === void 0 ? void 0 : _a.referenceHidden);
    return (react_1.default.createElement("div", { ref: floating, className: (0, classnames_1.default)(className, stylesClass, !isReady && frame_module_scss_1.default.hidden), style: Object.assign(Object.assign(Object.assign({}, style), dimensionRef.current), { position: strategy, 
            // starting at pos [0,0] will ensure the label doesn't increase the document size.
            top: y !== null && y !== void 0 ? y : 0, left: x !== null && x !== void 0 ? x : 0 }) }));
}
exports.Frame = Frame;
//# sourceMappingURL=frame.js.map