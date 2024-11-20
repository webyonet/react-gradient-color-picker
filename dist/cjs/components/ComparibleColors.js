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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var context_js_1 = require("../context.js");
var ComparibleColors = function (_a) {
    var openComparibles = _a.openComparibles;
    var _b = (0, context_js_1.usePicker)(), tinyColor = _b.tinyColor, handleChange = _b.handleChange, defaultStyles = _b.defaultStyles;
    var analogous = tinyColor.analogous();
    var monochromatic = tinyColor.monochromatic();
    var triad = tinyColor.triad();
    var tetrad = tinyColor.tetrad();
    var handleClick = function (tiny) {
        var _a = tiny.toRgb(), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
        handleChange("rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")"));
    };
    return (react_1.default.createElement("div", { style: {
            height: openComparibles ? 216 : 0,
            width: '100%',
            transition: 'all 120ms linear',
        } },
        react_1.default.createElement("div", { style: {
                paddingTop: 11,
                display: openComparibles ? '' : 'none',
                position: 'relative',
            } },
            react_1.default.createElement("div", { style: __assign({ textAlign: 'center', fontSize: 13, fontWeight: 600, position: 'absolute', top: 6.5, left: 2 }, defaultStyles.rbgcpComparibleLabel) }, "Color Guide"),
            react_1.default.createElement("div", { style: __assign({ textAlign: 'center', fontSize: 12, fontWeight: 500, marginTop: 3 }, defaultStyles.rbgcpComparibleLabel) }, "Analogous"),
            react_1.default.createElement("div", { style: { borderRadius: 5, overflow: 'hidden', display: 'flex' } }, analogous === null || analogous === void 0 ? void 0 : analogous.map(function (c, key) { return (react_1.default.createElement("div", { key: key, style: { width: '20%', height: 30, background: c.toHexString() }, onClick: function () { return handleClick(c); } })); })),
            react_1.default.createElement("div", { style: __assign({ textAlign: 'center', fontSize: 12, fontWeight: 500, marginTop: 3 }, defaultStyles.rbgcpComparibleLabel) }, "Monochromatic"),
            react_1.default.createElement("div", { style: {
                    borderRadius: 5,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'flex-end',
                } }, monochromatic === null || monochromatic === void 0 ? void 0 : monochromatic.map(function (c, key) { return (react_1.default.createElement("div", { key: key, 
                // className="rbgcp-comparible-colors-color"
                style: { width: '20%', height: 30, background: c.toHexString() }, onClick: function () { return handleClick(c); } })); })),
            react_1.default.createElement("div", { style: __assign({ textAlign: 'center', fontSize: 12, fontWeight: 500, marginTop: 3 }, defaultStyles.rbgcpComparibleLabel) }, "Triad"),
            react_1.default.createElement("div", { style: {
                    borderRadius: 5,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'flex-end',
                } }, triad === null || triad === void 0 ? void 0 : triad.map(function (c, key) { return (react_1.default.createElement("div", { key: key, 
                // className="rbgcp-comparible-colors-color"
                style: {
                    width: 'calc(100% / 3)',
                    height: 28,
                    background: c.toHexString(),
                }, onClick: function () { return handleClick(c); } })); })),
            react_1.default.createElement("div", { style: __assign({ textAlign: 'center', fontSize: 12, fontWeight: 500, marginTop: 3 }, defaultStyles.rbgcpComparibleLabel) }, "Tetrad"),
            react_1.default.createElement("div", { style: {
                    borderRadius: 5,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'flex-end',
                } }, tetrad === null || tetrad === void 0 ? void 0 : tetrad.map(function (c, key) { return (react_1.default.createElement("div", { key: key, 
                // className="rbgcp-comparible-colors-color"
                style: { width: '25%', height: 28, background: c.toHexString() }, onClick: function () { return handleClick(c); } })); })))));
};
exports.default = ComparibleColors;
