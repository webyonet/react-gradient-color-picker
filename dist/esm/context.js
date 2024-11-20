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
import React, { createContext, useContext, useState, useEffect, } from 'react';
import { isUpperCase, getColorObj, getDetails } from './utils/utils.js';
import { low, high, getColors } from './utils/formatters.js';
import tinycolor from 'tinycolor2';
var PickerContext = createContext(null);
export default function PickerContextWrapper(_a) {
    var value = _a.value, children = _a.children, onChange = _a.onChange, squareWidth = _a.squareWidth, hideOpacity = _a.hideOpacity, squareHeight = _a.squareHeight, defaultStyles = _a.defaultStyles;
    var colors = getColors(value);
    var _b = getDetails(value), degrees = _b.degrees, degreeStr = _b.degreeStr, isGradient = _b.isGradient, gradientType = _b.gradientType;
    var _c = getColorObj(colors), currentColor = _c.currentColor, selectedColor = _c.selectedColor, currentLeft = _c.currentLeft;
    var _d = useState('rgb'), inputType = _d[0], setInputType = _d[1];
    var _e = useState({}), previous = _e[0], setPrevious = _e[1];
    var tinyColor = tinycolor(currentColor);
    var rgba = tinyColor.toRgb();
    var hsv = tinyColor.toHsv();
    var _f = useState(__assign(__assign({}, rgba), hsv)), hc = _f[0], setHc = _f[1];
    useEffect(function () {
        if ((hsv === null || hsv === void 0 ? void 0 : hsv.s) === 0) {
            setHc(__assign(__assign(__assign({}, rgba), hsv), { h: hc === null || hc === void 0 ? void 0 : hc.h }));
        }
        else {
            setHc(__assign(__assign({}, rgba), hsv));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentColor]);
    var createGradientStr = function (newColors) {
        var sorted = newColors.sort(function (a, b) { return a.left - b.left; });
        var colorString = sorted === null || sorted === void 0 ? void 0 : sorted.map(function (cc) { return "".concat(cc === null || cc === void 0 ? void 0 : cc.value, " ").concat(cc.left, "%"); });
        var newGrade = "".concat(gradientType, "(").concat(degreeStr, ", ").concat(colorString.join(', '), ")");
        setPrevious(__assign(__assign({}, previous), { gradient: newGrade }));
        onChange(newGrade);
    };
    var handleGradient = function (newColor, left) {
        var remaining = colors === null || colors === void 0 ? void 0 : colors.filter(function (c) { return !isUpperCase(c.value); });
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
            setPrevious(__assign(__assign({}, previous), { color: newColor }));
            onChange(newColor);
        }
    };
    var deletePoint = function () {
        if ((colors === null || colors === void 0 ? void 0 : colors.length) > 2) {
            var formatted = colors === null || colors === void 0 ? void 0 : colors.map(function (fc, i) { return (__assign(__assign({}, fc), { value: i === selectedColor - 1 ? high(fc) : low(fc) })); });
            var remaining = formatted === null || formatted === void 0 ? void 0 : formatted.filter(function (_, i) { return i !== selectedColor; });
            createGradientStr(remaining);
        }
    };
    var pickerContext = {
        hc: hc,
        setHc: setHc,
        value: value,
        colors: colors,
        degrees: degrees,
        onChange: onChange,
        previous: previous,
        inputType: inputType,
        tinyColor: tinyColor,
        isGradient: isGradient,
        squareWidth: squareWidth,
        hideOpacity: hideOpacity,
        currentLeft: currentLeft,
        deletePoint: deletePoint,
        squareHeight: squareHeight,
        setInputType: setInputType,
        gradientType: gradientType,
        handleChange: handleChange,
        currentColor: currentColor,
        selectedColor: selectedColor,
        defaultStyles: defaultStyles,
        handleGradient: handleGradient,
        createGradientStr: createGradientStr,
    };
    return (React.createElement(PickerContext.Provider, { value: pickerContext }, children));
}
export function usePicker() {
    var pickerContext = useContext(PickerContext);
    if (!pickerContext) {
        throw new Error('usePicker has to be used within <PickerContext.Provider>');
    }
    return pickerContext;
}
