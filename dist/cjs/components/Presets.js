"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
var react_1 = __importDefault(require("react"));
var context_js_1 = require("../context.js");
var constants_js_1 = require("../constants.js");
var Presets = function (_a) {
    var _b = _a.presets, presets = _b === void 0 ? [] : _b;
    var _c = (0, context_js_1.usePicker)(), value = _c.value, onChange = _c.onChange, handleChange = _c.handleChange, squareWidth = _c.squareWidth;
    var getPresets = function () {
        if ((presets === null || presets === void 0 ? void 0 : presets.length) > 0) {
            return presets === null || presets === void 0 ? void 0 : presets.slice(0, 18);
        }
        else {
            return constants_js_1.fakePresets;
        }
    };
    var handlePresetClick = function (preset) {
        if (preset === null || preset === void 0 ? void 0 : preset.includes('gradient')) {
            onChange(preset);
        }
        else {
            handleChange(preset);
        }
    };
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            marginTop: 14,
            justifyContent: 'space-between',
        } },
        react_1.default.createElement("div", { style: {
                width: 50,
                height: 50,
                background: value,
                borderRadius: 6,
                flexShrink: 0,
            } }),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                flexWrap: 'wrap',
                width: squareWidth - 66,
                justifyContent: 'space-between',
            } }, getPresets().map(function (p, key) { return (react_1.default.createElement("div", { key: "".concat(p, "-").concat(key), style: {
                height: 23,
                width: '10.2%',
                borderRadius: 4,
                background: p,
                marginBottom: 2,
                border: p === 'rgba(255,255,255, 1)' ? '1px solid #96959c' : '',
            }, 
            // className="rbgcp-preset-color"
            onClick: function () { return handlePresetClick(p); } })); }))));
};
exports.default = Presets;
