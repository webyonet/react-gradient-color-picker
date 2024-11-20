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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColorPicker = void 0;
var react_1 = require("react");
var utils_js_1 = require("../utils/utils.js");
var formatters_js_1 = require("../utils/formatters.js");
var converters_js_1 = require("../utils/converters.js");
var constants_js_1 = require("../constants.js");
var tinycolor2_1 = __importDefault(require("tinycolor2"));
var defaultColor = constants_js_1.config.defaultColor, defaultGradient = constants_js_1.config.defaultGradient;
var useColorPicker = function (value, onChange) {
    var colors = (0, formatters_js_1.getColors)(value);
    var _a = (0, utils_js_1.getDetails)(value), degrees = _a.degrees, degreeStr = _a.degreeStr, isGradient = _a.isGradient, gradientType = _a.gradientType;
    var _b = (0, utils_js_1.getColorObj)(colors), currentColor = _b.currentColor, selectedColor = _b.selectedColor, currentLeft = _b.currentLeft;
    var _c = (0, react_1.useState)([]), previousColors = _c[0], setPreviousColors = _c[1];
    var getGradientObject = function (currentValue) {
        if (currentValue) {
            colors = (0, formatters_js_1.getColors)(currentValue);
        }
        if (value) {
            if (isGradient) {
                return {
                    isGradient: true,
                    gradientType: gradientType,
                    degrees: degreeStr,
                    colors: colors === null || colors === void 0 ? void 0 : colors.map(function (c) {
                        var _a;
                        return (__assign(__assign({}, c), { value: (_a = c.value) === null || _a === void 0 ? void 0 : _a.toLowerCase() }));
                    }),
                };
            }
            else {
                return {
                    isGradient: false,
                    gradientType: null,
                    degrees: null,
                    colors: colors === null || colors === void 0 ? void 0 : colors.map(function (c) {
                        var _a;
                        return (__assign(__assign({}, c), { value: (_a = c.value) === null || _a === void 0 ? void 0 : _a.toLowerCase() }));
                    }),
                };
            }
        }
        else {
            console.log('RBGCP ERROR - YOU MUST PASS A VALUE AND CALLBACK TO THE useColorPicker HOOK');
        }
    };
    var tiny = (0, tinycolor2_1.default)(currentColor);
    var _d = tiny.toRgb(), r = _d.r, g = _d.g, b = _d.b, a = _d.a;
    var _e = tiny.toHsl(), h = _e.h, s = _e.s, l = _e.l;
    (0, react_1.useEffect)(function () {
        var _a;
        if (((_a = (0, tinycolor2_1.default)(currentColor)) === null || _a === void 0 ? void 0 : _a.isValid()) && previousColors[0] !== currentColor) {
            // @ts-expect-error - currentColor type issue
            setPreviousColors(__spreadArray([currentColor], previousColors.slice(0, 19), true));
        }
    }, [currentColor, previousColors]);
    var setLinear = function () {
        var remaining = value.split(/,(.+)/)[1];
        onChange("linear-gradient(90deg, ".concat(remaining));
    };
    var setRadial = function () {
        var remaining = value.split(/,(.+)/)[1];
        onChange("radial-gradient(circle, ".concat(remaining));
    };
    var setDegrees = function (newDegrees) {
        var remaining = value.split(/,(.+)/)[1];
        onChange("linear-gradient(".concat((0, formatters_js_1.formatInputValues)(newDegrees, 0, 360), "deg, ").concat(remaining));
        if (gradientType !== 'linear-gradient') {
            console.log('Warning: you are updating degrees when the gradient type is not linear. This will change the gradients type which may be undesired');
        }
    };
    var setSolid = function (startingColor) {
        var newValue = startingColor !== null && startingColor !== void 0 ? startingColor : defaultColor;
        onChange(newValue);
    };
    var setGradient = function (startingGradiant) {
        var newValue = startingGradiant !== null && startingGradiant !== void 0 ? startingGradiant : defaultGradient;
        onChange(newValue);
    };
    var createGradientStr = function (newColors) {
        var sorted = newColors.sort(function (a, b) { return a.left - b.left; });
        var colorString = sorted === null || sorted === void 0 ? void 0 : sorted.map(function (cc) { return "".concat(cc === null || cc === void 0 ? void 0 : cc.value, " ").concat(cc.left, "%"); });
        onChange("".concat(gradientType, "(").concat(degreeStr, ", ").concat(colorString.join(', '), ")"));
    };
    var handleGradient = function (newColor, left) {
        var remaining = colors === null || colors === void 0 ? void 0 : colors.filter(function (c) { return !(0, utils_js_1.isUpperCase)(c.value); });
        var newColors = __spreadArray([
            { value: newColor.toUpperCase(), left: left !== null && left !== void 0 ? left : currentLeft }
        ], remaining, true);
        createGradientStr(newColors);
    };
    var handleChange = function (newColor) {
        if (isGradient) {
            handleGradient(newColor);
        }
        else {
            onChange(newColor);
        }
    };
    var setR = function (newR) {
        var newVal = (0, formatters_js_1.formatInputValues)(newR, 0, 255);
        handleChange("rgba(".concat(newVal, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")"));
    };
    var setG = function (newG) {
        var newVal = (0, formatters_js_1.formatInputValues)(newG, 0, 255);
        handleChange("rgba(".concat(r, ", ").concat(newVal, ", ").concat(b, ", ").concat(a, ")"));
    };
    var setB = function (newB) {
        var newVal = (0, formatters_js_1.formatInputValues)(newB, 0, 255);
        handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(newVal, ", ").concat(a, ")"));
    };
    var setA = function (newA) {
        var newVal = (0, formatters_js_1.formatInputValues)(newA, 0, 100);
        handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(newVal / 100, ")"));
    };
    var setHue = function (newHue) {
        var newVal = (0, formatters_js_1.formatInputValues)(newHue, 0, 360);
        var tinyNew = (0, tinycolor2_1.default)({ h: newVal, s: s, l: l });
        var _a = tinyNew.toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")"));
    };
    var setSaturation = function (newSat) {
        var newVal = (0, formatters_js_1.formatInputValues)(newSat, 0, 100);
        var tinyNew = (0, tinycolor2_1.default)({ h: h, s: newVal / 100, l: l });
        var _a = tinyNew.toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")"));
    };
    var setLightness = function (newLight) {
        var newVal = (0, formatters_js_1.formatInputValues)(newLight, 0, 100);
        var tinyNew = (0, tinycolor2_1.default)({ h: h, s: s, l: newVal / 100 });
        if (tinyNew === null || tinyNew === void 0 ? void 0 : tinyNew.isValid()) {
            var _a = tinyNew.toRgb(), r_1 = _a.r, g_1 = _a.g, b_1 = _a.b;
            handleChange("rgba(".concat(r_1, ", ").concat(g_1, ", ").concat(b_1, ", ").concat(a, ")"));
        }
        else {
            console.log('The new color was invalid, perhaps the lightness you passed in was a decimal? Please pass the new value between 0 - 100');
        }
    };
    var valueToHSL = function () {
        return tiny.toHslString();
    };
    var valueToHSV = function () {
        return tiny.toHsvString();
    };
    var valueToHex = function () {
        return tiny.toHexString();
    };
    var valueToCmyk = function () {
        var _a = (0, converters_js_1.rgb2cmyk)(r, g, b), c = _a.c, m = _a.m, y = _a.y, k = _a.k;
        return "cmyk(".concat(c, ", ").concat(m, ", ").concat(y, ", ").concat(k, ")");
    };
    var setSelectedPoint = function (index) {
        if (isGradient) {
            var newGradStr = colors === null || colors === void 0 ? void 0 : colors.map(function (cc, i) { return (__assign(__assign({}, cc), { value: i === index ? (0, formatters_js_1.high)(cc) : (0, formatters_js_1.low)(cc) })); });
            createGradientStr(newGradStr);
        }
        else {
            console.log('This function is only relevant when the picker is in gradient mode');
        }
    };
    var addPoint = function (left) {
        var newColors = __spreadArray(__spreadArray([], colors.map(function (c) { return (__assign(__assign({}, c), { value: (0, formatters_js_1.low)(c) })); }), true), [
            { value: currentColor, left: left },
        ], false);
        createGradientStr(newColors);
        if (!left) {
            console.log('You did not pass a stop value (left amount) for the new color point so it defaulted to 50');
        }
    };
    var deletePoint = function (index) {
        if ((colors === null || colors === void 0 ? void 0 : colors.length) > 2) {
            var pointToDelete_1 = index !== null && index !== void 0 ? index : selectedColor;
            var remaining = colors === null || colors === void 0 ? void 0 : colors.filter(function (rc, i) { return i !== pointToDelete_1; });
            createGradientStr(remaining);
            if (!index) {
                console.log('You did not pass in the index of the point you wanted to delete so the function default to the currently selected point');
            }
        }
        else {
            console.log('A gradient must have atleast two colors, disable your delete button when necessary');
        }
    };
    var setPointLeft = function (left) {
        handleGradient(currentColor, (0, formatters_js_1.formatInputValues)(left, 0, 100));
    };
    var rgbaArr = [r, g, b, a];
    var hslArr = [h, s, l];
    return {
        setR: setR,
        setG: setG,
        setB: setB,
        setA: setA,
        setHue: setHue,
        addPoint: addPoint,
        setSolid: setSolid,
        setLinear: setLinear,
        setRadial: setRadial,
        valueToHSL: valueToHSL,
        valueToHSV: valueToHSV,
        valueToHex: valueToHex,
        valueToCmyk: valueToCmyk,
        setDegrees: setDegrees,
        setGradient: setGradient,
        setLightness: setLightness,
        setSaturation: setSaturation,
        setSelectedPoint: setSelectedPoint,
        deletePoint: deletePoint,
        isGradient: isGradient,
        gradientType: gradientType,
        degrees: degrees,
        setPointLeft: setPointLeft,
        currentLeft: currentLeft,
        rgbaArr: rgbaArr,
        hslArr: hslArr,
        handleChange: handleChange,
        previousColors: previousColors,
        getGradientObject: getGradientObject,
        selectedPoint: selectedColor,
    };
};
exports.useColorPicker = useColorPicker;
