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
import React, { useState, useEffect } from 'react';
import { formatInputValues, round } from '../utils/formatters.js';
import { rgb2cmyk, cmykToRgb } from '../utils/converters.js';
import { usePicker } from '../context.js';
import tc from 'tinycolor2';
var Input = function (_a) {
    var value = _a.value, callback = _a.callback, _b = _a.max, max = _b === void 0 ? 100 : _b, label = _a.label;
    var _c = useState(value), temp = _c[0], setTemp = _c[1];
    var _d = usePicker(), hideOpacity = _d.hideOpacity, defaultStyles = _d.defaultStyles;
    var width = hideOpacity ? '22%' : '18%';
    useEffect(function () {
        setTemp(value);
    }, [value]);
    var onChange = function (e) {
        var newVal = formatInputValues(parseFloat(e.target.value), 0, max);
        setTemp(newVal);
        callback(newVal);
    };
    return (React.createElement("div", { style: { width: width } },
        React.createElement("input", { value: temp, className: "rbgcp-input", onChange: function (e) { return onChange(e); }, style: __assign({}, defaultStyles.rbgcpInput) }),
        React.createElement("div", { style: __assign({}, defaultStyles.rbgcpInputLabel) }, label)));
};
var HexInput = function (_a) {
    var opacity = _a.opacity;
    var _b = usePicker(), handleChange = _b.handleChange, tinyColor = _b.tinyColor, defaultStyles = _b.defaultStyles;
    var _c = useState(''), disable = _c[0], setDisable = _c[1];
    var hex = tinyColor.toHex();
    var _d = useState(hex), newHex = _d[0], setNewHex = _d[1];
    useEffect(function () {
        if (disable !== 'hex') {
            setNewHex(hex);
        }
    }, [tinyColor, disable, hex]);
    var hexFocus = function () {
        setDisable('hex');
    };
    var hexBlur = function () {
        setDisable('');
    };
    var handleHex = function (e) {
        var tinyHex = tc(e.target.value);
        setNewHex(e.target.value);
        if (tinyHex.isValid()) {
            var _a = tinyHex.toRgb(), r = _a.r, g = _a.g, b = _a.b;
            var newColor = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity, ")");
            handleChange(newColor);
        }
    };
    return (React.createElement("div", { style: { width: '23%' } },
        React.createElement("input", { value: newHex, onBlur: hexBlur, onFocus: hexFocus, className: "rbgcp-hex-input", onChange: function (e) { return handleHex(e); }, style: __assign(__assign({}, defaultStyles.rbgcpInput), defaultStyles.rbgcpHexInput) }),
        React.createElement("div", { style: __assign({}, defaultStyles.rbgcpInputLabel) }, "HEX")));
};
var RGBInputs = function () {
    var _a = usePicker(), handleChange = _a.handleChange, hc = _a.hc;
    var handleRgb = function (_a) {
        var r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { value: hc === null || hc === void 0 ? void 0 : hc.r, callback: function (newVal) { return handleRgb({ r: newVal, g: hc === null || hc === void 0 ? void 0 : hc.g, b: hc === null || hc === void 0 ? void 0 : hc.b }); }, label: "R", max: 255 }),
        React.createElement(Input, { value: hc === null || hc === void 0 ? void 0 : hc.g, callback: function (newVal) { return handleRgb({ r: hc === null || hc === void 0 ? void 0 : hc.r, g: newVal, b: hc === null || hc === void 0 ? void 0 : hc.b }); }, label: "G", max: 255 }),
        React.createElement(Input, { value: hc === null || hc === void 0 ? void 0 : hc.b, callback: function (newVal) { return handleRgb({ r: hc === null || hc === void 0 ? void 0 : hc.r, g: hc === null || hc === void 0 ? void 0 : hc.g, b: newVal }); }, label: "B", max: 255 })));
};
var HSLInputs = function () {
    var _a = usePicker(), handleChange = _a.handleChange, tinyColor = _a.tinyColor, setHc = _a.setHc, hc = _a.hc;
    var _b = tinyColor.toHsl(), s = _b.s, l = _b.l;
    var handleH = function (h, s, l) {
        var _a = tc({ h: h, s: s, l: l }).toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
        setHc(__assign(__assign({}, hc), { h: h }));
    };
    var handleSl = function (value) {
        var _a = tc(value).toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { value: round(hc === null || hc === void 0 ? void 0 : hc.h), callback: function (newVal) { return handleH(newVal, s, l); }, label: "H", max: 360 }),
        React.createElement(Input, { value: round(s * 100), callback: function (newVal) { return handleSl({ h: hc === null || hc === void 0 ? void 0 : hc.h, s: newVal, l: l }); }, label: "S" }),
        React.createElement(Input, { value: round(l * 100), callback: function (newVal) { return handleSl({ h: hc === null || hc === void 0 ? void 0 : hc.h, s: s, l: newVal }); }, label: "L" })));
};
var HSVInputs = function () {
    var _a = usePicker(), handleChange = _a.handleChange, setHc = _a.setHc, hc = _a.hc;
    var handleH = function (h, s, v) {
        var _a = tc({ h: h, s: s, v: v }).toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
        setHc(__assign(__assign({}, hc), { h: h }));
    };
    var handleSV = function (value) {
        var _a = tc(value).toRgb(), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { value: round(hc === null || hc === void 0 ? void 0 : hc.h), callback: function (newVal) { return handleH(newVal, hc === null || hc === void 0 ? void 0 : hc.s, hc === null || hc === void 0 ? void 0 : hc.v); }, label: "H", max: 360 }),
        React.createElement(Input, { value: round((hc === null || hc === void 0 ? void 0 : hc.s) * 100), callback: function (newVal) { return handleSV({ h: hc === null || hc === void 0 ? void 0 : hc.h, s: newVal, v: hc === null || hc === void 0 ? void 0 : hc.v }); }, label: "S" }),
        React.createElement(Input, { value: round((hc === null || hc === void 0 ? void 0 : hc.v) * 100), callback: function (newVal) { return handleSV({ h: hc === null || hc === void 0 ? void 0 : hc.h, s: hc === null || hc === void 0 ? void 0 : hc.s, v: newVal }); }, label: "V" })));
};
var CMKYInputs = function () {
    var _a = usePicker(), handleChange = _a.handleChange, hc = _a.hc;
    var _b = rgb2cmyk(hc === null || hc === void 0 ? void 0 : hc.r, hc === null || hc === void 0 ? void 0 : hc.g, hc === null || hc === void 0 ? void 0 : hc.b), c = _b.c, m = _b.m, y = _b.y, k = _b.k;
    var handleCmyk = function (value) {
        var _a = cmykToRgb(value), r = _a.r, g = _a.g, b = _a.b;
        handleChange("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(hc === null || hc === void 0 ? void 0 : hc.a, ")"));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { value: round(c * 100), callback: function (newVal) { return handleCmyk({ c: newVal / 100, m: m, y: y, k: k }); }, label: "C" }),
        React.createElement(Input, { value: round(m * 100), callback: function (newVal) { return handleCmyk({ c: c, m: newVal / 100, y: y, k: k }); }, label: "M" }),
        React.createElement(Input, { value: round(y * 100), callback: function (newVal) { return handleCmyk({ c: c, m: m, y: newVal / 100, k: k }); }, label: "Y" }),
        React.createElement(Input, { value: round(k * 100), callback: function (newVal) { return handleCmyk({ c: c, m: m, y: y, k: newVal / 100 }); }, label: "K" })));
};
var Inputs = function () {
    var _a = usePicker(), handleChange = _a.handleChange, inputType = _a.inputType, hideOpacity = _a.hideOpacity, hc = _a.hc, defaultStyles = _a.defaultStyles;
    return (React.createElement("div", { style: __assign({ paddingTop: 14, display: 'flex', justifyContent: 'space-between' }, defaultStyles.rbgcpInputsWrap), className: "rbgcp-inputs-wrap" },
        inputType !== 'cmyk' && React.createElement(HexInput, { opacity: hc === null || hc === void 0 ? void 0 : hc.a }),
        inputType === 'hsl' && React.createElement(HSLInputs, null),
        inputType === 'rgb' && React.createElement(RGBInputs, null),
        inputType === 'hsv' && React.createElement(HSVInputs, null),
        inputType === 'cmyk' && React.createElement(CMKYInputs, null),
        !hideOpacity && (React.createElement(Input, { value: Math.round((hc === null || hc === void 0 ? void 0 : hc.a) * 100), callback: function (newVal) {
                return handleChange("rgba(".concat(hc === null || hc === void 0 ? void 0 : hc.r, ", ").concat(hc === null || hc === void 0 ? void 0 : hc.g, ", ").concat(hc === null || hc === void 0 ? void 0 : hc.b, ", ").concat(newVal / 100, ")"));
            }, label: "A" }))));
};
export default Inputs;
