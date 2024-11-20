"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var context_js_1 = require("../context.js");
var utils_js_1 = require("../utils/utils.js");
var usePaintHue_js_1 = require("../hooks/usePaintHue.js");
var tinycolor2_1 = __importDefault(require("tinycolor2"));
var AdvBar = function (_a) {
    var value = _a.value, callback = _a.callback, reffy = _a.reffy, openAdvanced = _a.openAdvanced, label = _a.label;
    var _b = (0, context_js_1.usePicker)(), squareWidth = _b.squareWidth, defaultStyles = _b.defaultStyles;
    var _c = (0, react_1.useState)(false), dragging = _c[0], setDragging = _c[1];
    var _d = (0, react_1.useState)(2), handleTop = _d[0], setHandleTop = _d[1];
    var left = value * (squareWidth - 18);
    (0, react_1.useEffect)(function () {
        var _a;
        setHandleTop(((_a = reffy === null || reffy === void 0 ? void 0 : reffy.current) === null || _a === void 0 ? void 0 : _a.offsetTop) - 2);
    }, [openAdvanced, reffy]);
    var stopDragging = function () {
        setDragging(false);
    };
    var handleMove = function (e) {
        if (dragging) {
            callback((0, utils_js_1.getHandleValue)(e));
        }
    };
    var handleClick = function (e) {
        if (!dragging) {
            callback((0, utils_js_1.getHandleValue)(e));
        }
    };
    var handleDown = function () {
        setDragging(true);
    };
    (0, react_1.useEffect)(function () {
        var handleUp = function () {
            stopDragging();
        };
        window.addEventListener('mouseup', handleUp);
        return function () {
            window.removeEventListener('mouseup', handleUp);
        };
    }, []);
    return (react_1.default.createElement("div", { style: { width: '100%', padding: '3px 0px 3px 0px' } },
        react_1.default.createElement("div", { onMouseMove: function (e) { return handleMove(e); }, 
            // className="rbgcp-advanced-bar-wrap"
            style: { cursor: 'resize', position: 'relative' } },
            react_1.default.createElement("div", { style: __assign({ left: left, top: handleTop }, defaultStyles.rbgcpHandle), 
                // className="rbgcp-advanced-bar-handle"
                onMouseDown: handleDown, role: "button", tabIndex: 0 }),
            react_1.default.createElement("div", { style: {
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1,
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, 0%)',
                    top: handleTop + 2,
                    zIndex: 10,
                    textShadow: '1px 1px 1px rgba(0,0,0,.6)',
                }, 
                // className="rbgcp-advanced-bar-label"
                onMouseMove: function (e) { return handleMove(e); }, onClick: function (e) { return handleClick(e); }, tabIndex: 0, role: "button", onKeyDown: function () {
                    return;
                } }, label),
            react_1.default.createElement("canvas", { ref: reffy, height: "14px", width: "".concat(squareWidth, "px"), onClick: function (e) { return handleClick(e); }, 
                // className="rbgcp-advanced-bar-canvas"
                style: { position: 'relative', borderRadius: 14 } }))));
};
var AdvancedControls = function (_a) {
    var openAdvanced = _a.openAdvanced;
    var _b = (0, context_js_1.usePicker)(), tinyColor = _b.tinyColor, handleChange = _b.handleChange, squareWidth = _b.squareWidth, hc = _b.hc;
    var _c = tinyColor.toHsl(), s = _c.s, l = _c.l;
    var satRef = (0, react_1.useRef)(null);
    var lightRef = (0, react_1.useRef)(null);
    var brightRef = (0, react_1.useRef)(null);
    (0, usePaintHue_js_1.usePaintSat)(satRef, hc === null || hc === void 0 ? void 0 : hc.h, l * 100, squareWidth);
    (0, usePaintHue_js_1.usePaintLight)(lightRef, hc === null || hc === void 0 ? void 0 : hc.h, s * 100, squareWidth);
    (0, usePaintHue_js_1.usePaintBright)(brightRef, hc === null || hc === void 0 ? void 0 : hc.h, s * 100, squareWidth);
    var satDesat = function (value) {
        var _a = (0, tinycolor2_1.default)({ h: hc === null || hc === void 0 ? void 0 : hc.h, s: value / 100, l: l }).toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
    };
    var setLight = function (value) {
        var _a = (0, tinycolor2_1.default)({ h: hc === null || hc === void 0 ? void 0 : hc.h, s: s, l: value / 100 }).toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
    };
    var setBright = function (value) {
        var _a = (0, tinycolor2_1.default)({
            h: hc === null || hc === void 0 ? void 0 : hc.h,
            s: (hc === null || hc === void 0 ? void 0 : hc.s) * 100,
            v: value,
        }).toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
    };
    return (react_1.default.createElement("div", { style: {
            height: openAdvanced ? 98 : 0,
            width: '100%',
            transition: 'all 120ms linear',
        } },
        react_1.default.createElement("div", { style: {
                paddingTop: 11,
                display: openAdvanced ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: openAdvanced ? 98 : 0,
                overflow: 'hidden',
                transition: 'height 100ms linear',
            } },
            react_1.default.createElement(AdvBar, { value: s, reffy: satRef, callback: satDesat, openAdvanced: openAdvanced, label: "Saturation" }),
            react_1.default.createElement(AdvBar, { value: l, reffy: lightRef, label: "Lightness", callback: setLight, openAdvanced: openAdvanced }),
            react_1.default.createElement(AdvBar, { value: hc === null || hc === void 0 ? void 0 : hc.v, reffy: brightRef, label: "Brightness", callback: setBright, openAdvanced: openAdvanced }))));
};
exports.default = AdvancedControls;
