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
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-leaked-render */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { getHandleValue } from '../utils/utils.js';
import { usePicker } from '../context.js';
import { low, high } from '../utils/formatters.js';
export var Handle = function (_a) {
    var left = _a.left, i = _a.i, setDragging = _a.setDragging;
    var _b = usePicker(), colors = _b.colors, selectedColor = _b.selectedColor, squareWidth = _b.squareWidth, defaultStyles = _b.defaultStyles, createGradientStr = _b.createGradientStr;
    var isSelected = selectedColor === i;
    var leftMultiplyer = (squareWidth - 18) / 100;
    var setSelectedColor = function (index) {
        var newGradStr = colors === null || colors === void 0 ? void 0 : colors.map(function (cc, i) { return (__assign(__assign({}, cc), { value: i === index ? high(cc) : low(cc) })); });
        createGradientStr(newGradStr);
    };
    var handleDown = function (e) {
        e.stopPropagation();
        setSelectedColor(i);
        setDragging(true);
    };
    // const handleFocus = () => {
    //   setInFocus('gpoint')
    //   setSelectedColor(i)
    // }
    // const handleBlur = () => {
    //   setInFocus(null)
    // }
    return (React.createElement("div", { 
        // tabIndex={0}
        // onBlur={handleBlur}
        // onFocus={handleFocus}
        className: "gradient-handle-".concat(i), onMouseDown: function (e) { return handleDown(e); }, 
        // className="rbgcp-gradient-handle-wrap"
        style: __assign(__assign({}, defaultStyles.rbgcpGradientHandleWrap), { left: (left !== null && left !== void 0 ? left : 0) * leftMultiplyer }) },
        React.createElement("div", { 
            // className="rbgcp-gradient-handle"
            style: __assign(__assign({}, defaultStyles.rbgcpGradientHandle), (isSelected ? { boxShadow: '0px 0px 5px 1px rgba(86, 140, 245,.95)', border: '2px solid white' } : {})) }, isSelected && (React.createElement("div", { style: {
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'white',
            } })))));
};
var GradientBar = function () {
    var _a = usePicker(), currentColor = _a.currentColor, createGradientStr = _a.createGradientStr, colors = _a.colors, value = _a.value, handleGradient = _a.handleGradient, squareWidth = _a.squareWidth;
    var _b = useState(false), dragging = _b[0], setDragging = _b[1];
    // const [inFocus, setInFocus] = useState<string | null>(null)
    function force90degLinear(color) {
        return color.replace(/(radial|linear)-gradient\([^,]+,/, 'linear-gradient(90deg,');
    }
    var addPoint = function (e) {
        var _a;
        var left = getHandleValue(e);
        var newColors = (_a = __spreadArray(__spreadArray([], colors.map(function (c) { return (__assign(__assign({}, c), { value: low(c) })); }), true), [
            { value: currentColor, left: left },
        ], false)) === null || _a === void 0 ? void 0 : _a.sort(function (a, b) { return a.left - b.left; });
        createGradientStr(newColors);
    };
    // useEffect(() => {
    //   const selectedEl = window?.document?.getElementById(
    //     `gradient-handle-${selectedColor}`
    //   )
    //   if (selectedEl) selectedEl.focus()
    // }, [selectedColor])
    var stopDragging = function () {
        setDragging(false);
    };
    var handleDown = function (e) {
        if (dragging)
            return;
        addPoint(e);
        setDragging(true);
    };
    var handleMove = function (e) {
        if (dragging)
            handleGradient(currentColor, getHandleValue(e));
    };
    // const handleKeyboard = (e: any) => {
    //   if (isGradient) {
    //     if (e.keyCode === 8) {
    //       if (inFocus === 'gpoint') {
    //         deletePoint()
    //       }
    //     }
    //   }
    // }
    var handleUp = function () {
        stopDragging();
    };
    useEffect(function () {
        window.addEventListener('mouseup', handleUp);
        // window?.addEventListener('keydown', handleKeyboard)
        return function () {
            window.removeEventListener('mouseup', handleUp);
            // window?.removeEventListener('keydown', handleKeyboard)
        };
    });
    return (React.createElement("div", { style: {
            width: '100%',
            marginTop: 17,
            marginBottom: 4,
            position: 'relative',
        }, className: "gradient-bar" },
        React.createElement("div", { style: {
                height: 14,
                borderRadius: 10,
                width: squareWidth,
                backgroundImage: force90degLinear(value),
            }, onMouseDown: function (e) { return handleDown(e); }, onMouseMove: function (e) { return handleMove(e); } }), colors === null || colors === void 0 ? void 0 :
        colors.map(function (c, i) { return (React.createElement(Handle, { i: i, left: c.left, key: "".concat(i, "-").concat(c), setDragging: setDragging })); })));
};
export default GradientBar;
