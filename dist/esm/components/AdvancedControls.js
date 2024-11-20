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
import React, { useState, useRef, useEffect } from 'react';
import { usePicker } from '../context.js';
import { getHandleValue } from '../utils/utils.js';
import { usePaintSat, usePaintLight, usePaintBright, } from '../hooks/usePaintHue.js';
import tinycolor from 'tinycolor2';
var AdvBar = function (_a) {
    var value = _a.value, callback = _a.callback, reffy = _a.reffy, openAdvanced = _a.openAdvanced, label = _a.label;
    var _b = usePicker(), squareWidth = _b.squareWidth, defaultStyles = _b.defaultStyles;
    var _c = useState(false), dragging = _c[0], setDragging = _c[1];
    var _d = useState(2), handleTop = _d[0], setHandleTop = _d[1];
    var left = value * (squareWidth - 18);
    useEffect(function () {
        var _a;
        setHandleTop(((_a = reffy === null || reffy === void 0 ? void 0 : reffy.current) === null || _a === void 0 ? void 0 : _a.offsetTop) - 2);
    }, [openAdvanced, reffy]);
    var stopDragging = function () {
        setDragging(false);
    };
    var handleMove = function (e) {
        if (dragging) {
            callback(getHandleValue(e));
        }
    };
    var handleClick = function (e) {
        if (!dragging) {
            callback(getHandleValue(e));
        }
    };
    var handleDown = function () {
        setDragging(true);
    };
    useEffect(function () {
        var handleUp = function () {
            stopDragging();
        };
        window.addEventListener('mouseup', handleUp);
        return function () {
            window.removeEventListener('mouseup', handleUp);
        };
    }, []);
    return (React.createElement("div", { style: { width: '100%', padding: '3px 0px 3px 0px' } },
        React.createElement("div", { onMouseMove: function (e) { return handleMove(e); }, 
            // className="rbgcp-advanced-bar-wrap"
            style: { cursor: 'resize', position: 'relative' } },
            React.createElement("div", { style: __assign({ left: left, top: handleTop }, defaultStyles.rbgcpHandle), 
                // className="rbgcp-advanced-bar-handle"
                onMouseDown: handleDown, role: "button", tabIndex: 0 }),
            React.createElement("div", { style: {
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
            React.createElement("canvas", { ref: reffy, height: "14px", width: "".concat(squareWidth, "px"), onClick: function (e) { return handleClick(e); }, 
                // className="rbgcp-advanced-bar-canvas"
                style: { position: 'relative', borderRadius: 14 } }))));
};
var AdvancedControls = function (_a) {
    var openAdvanced = _a.openAdvanced;
    var _b = usePicker(), tinyColor = _b.tinyColor, handleChange = _b.handleChange, squareWidth = _b.squareWidth, hc = _b.hc;
    var _c = tinyColor.toHsl(), s = _c.s, l = _c.l;
    var satRef = useRef(null);
    var lightRef = useRef(null);
    var brightRef = useRef(null);
    usePaintSat(satRef, hc === null || hc === void 0 ? void 0 : hc.h, l * 100, squareWidth);
    usePaintLight(lightRef, hc === null || hc === void 0 ? void 0 : hc.h, s * 100, squareWidth);
    usePaintBright(brightRef, hc === null || hc === void 0 ? void 0 : hc.h, s * 100, squareWidth);
    var satDesat = function (value) {
        var _a = tinycolor({ h: hc === null || hc === void 0 ? void 0 : hc.h, s: value / 100, l: l }).toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
    };
    var setLight = function (value) {
        var _a = tinycolor({ h: hc === null || hc === void 0 ? void 0 : hc.h, s: s, l: value / 100 }).toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
    };
    var setBright = function (value) {
        var _a = tinycolor({
            h: hc === null || hc === void 0 ? void 0 : hc.h,
            s: (hc === null || hc === void 0 ? void 0 : hc.s) * 100,
            v: value,
        }).toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
    };
    return (React.createElement("div", { style: {
            height: openAdvanced ? 98 : 0,
            width: '100%',
            transition: 'all 120ms linear',
        } },
        React.createElement("div", { style: {
                paddingTop: 11,
                display: openAdvanced ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: openAdvanced ? 98 : 0,
                overflow: 'hidden',
                transition: 'height 100ms linear',
            } },
            React.createElement(AdvBar, { value: s, reffy: satRef, callback: satDesat, openAdvanced: openAdvanced, label: "Saturation" }),
            React.createElement(AdvBar, { value: l, reffy: lightRef, label: "Lightness", callback: setLight, openAdvanced: openAdvanced }),
            React.createElement(AdvBar, { value: hc === null || hc === void 0 ? void 0 : hc.v, reffy: brightRef, label: "Brightness", callback: setBright, openAdvanced: openAdvanced }))));
};
export default AdvancedControls;
