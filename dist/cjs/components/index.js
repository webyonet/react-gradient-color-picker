"use strict";
'use client';
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
exports.ColorPicker = ColorPicker;
var react_1 = __importDefault(require("react"));
var context_js_1 = __importDefault(require("../context.js"));
var Picker_js_1 = __importDefault(require("./Picker.js"));
var constants_js_1 = require("../constants.js");
var utils_js_1 = require("../utils/utils.js");
var styles_js_1 = require("../styles/styles.js");
function ColorPicker(_a) {
    var _b = _a.value, value = _b === void 0 ? 'rgba(175, 51, 242, 1)' : _b, onChange = _a.onChange, _c = _a.hideControls, hideControls = _c === void 0 ? false : _c, _d = _a.hideInputs, hideInputs = _d === void 0 ? false : _d, _e = _a.hideOpacity, hideOpacity = _e === void 0 ? false : _e, _f = _a.hidePresets, hidePresets = _f === void 0 ? false : _f, _g = _a.hideHue, hideHue = _g === void 0 ? false : _g, _h = _a.presets, presets = _h === void 0 ? [] : _h, _j = _a.hideEyeDrop, hideEyeDrop = _j === void 0 ? false : _j, _k = _a.hideAdvancedSliders, hideAdvancedSliders = _k === void 0 ? false : _k, _l = _a.hideColorGuide, hideColorGuide = _l === void 0 ? false : _l, _m = _a.hideInputType, hideInputType = _m === void 0 ? false : _m, _o = _a.hideColorTypeBtns, hideColorTypeBtns = _o === void 0 ? false : _o, _p = _a.hideGradientType, hideGradientType = _p === void 0 ? false : _p, _q = _a.hideGradientAngle, hideGradientAngle = _q === void 0 ? false : _q, _r = _a.hideGradientStop, hideGradientStop = _r === void 0 ? false : _r, _s = _a.hideGradientControls, hideGradientControls = _s === void 0 ? false : _s, _t = _a.locales, locales = _t === void 0 ? constants_js_1.defaultLocales : _t, _u = _a.width, width = _u === void 0 ? 294 : _u, _v = _a.height, height = _v === void 0 ? 294 : _v, _w = _a.style, style = _w === void 0 ? {} : _w, className = _a.className, _x = _a.disableDarkMode, disableDarkMode = _x === void 0 ? false : _x, _y = _a.disableLightMode, disableLightMode = _y === void 0 ? false : _y;
    var safeValue = (0, utils_js_1.objectToString)(value);
    // const contRef = useRef<HTMLDivElement>(null)
    var defaultStyles = (0, styles_js_1.getStyles)(disableDarkMode, disableLightMode);
    return (react_1.default.createElement("div", { 
        // ref={contRef}
        className: className, style: __assign(__assign(__assign({}, defaultStyles.body), style), { width: width }) },
        react_1.default.createElement(context_js_1.default, { value: safeValue, onChange: onChange, squareWidth: width, squareHeight: height, hideOpacity: hideOpacity, defaultStyles: defaultStyles },
            react_1.default.createElement(Picker_js_1.default, { hideControls: hideControls, hideInputs: hideInputs, hidePresets: hidePresets, hideOpacity: hideOpacity, hideHue: hideHue, presets: presets, hideEyeDrop: hideEyeDrop, hideAdvancedSliders: hideAdvancedSliders, hideColorGuide: hideColorGuide, hideInputType: hideInputType, hideColorTypeBtns: hideColorTypeBtns, hideGradientType: hideGradientType, hideGradientAngle: hideGradientAngle, hideGradientStop: hideGradientStop, hideGradientControls: hideGradientControls, locales: locales }))));
}
