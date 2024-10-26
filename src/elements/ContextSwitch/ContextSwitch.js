var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import "./ContextSwitch.styles.css";
import "./styles/Shadow.styles.css";
import "./styles/ToggleOn.styles.css";
import "./styles/ToggleOff.styles.css";
import "./styles/Fill.styles.css";
import "./styles/LightOn.styles.css";
import "./styles/LightOff.styles.css";
import clsx from "clsx";
const ContextSwitch = (_a) => {
    var { children, on, defaultOn = true, onChange } = _a, props = __rest(_a, ["children", "on", "defaultOn", "onChange"]);
    const rootRef = React.useRef(null);
    const [isOn, setIsOn] = React.useState(defaultOn);
    const timer = React.useRef(0);
    const isControlled = on !== undefined;
    const isLocalOn = React.useMemo(() => (isControlled ? on : isOn), [on, isOn]);
    const [isChecked, setIsChecked] = React.useState(isLocalOn);
    console.log("isLocalOn", { isLocalOn });
    const onClick = React.useCallback((value) => {
        console.log("isLocalOn", { value, isChecked, isLocalOn, isControlled });
        if (value === isChecked)
            return;
        if (timer.current)
            clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            if (!rootRef.current)
                return;
            rootRef.current.style.setProperty("--transition-duration", "0");
            if (!isControlled) {
                setIsOn(!value);
            }
            else {
                onChange === null || onChange === void 0 ? void 0 : onChange(!value);
            }
            setTimeout(() => {
                var _a;
                if (!rootRef.current)
                    return;
                (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty("--transition-duration", "");
            }, 100);
        }, 500);
        setIsChecked(value);
    }, [isLocalOn, isChecked, onChange]);
    return (_jsxs("div", Object.assign({ ref: rootRef, className: clsx("ContextSwitch", isChecked && "checked", isLocalOn && "on") }, props, { children: [_jsx("span", { className: "ContextSwitch_Shadow ContextSwitch_Shadow--top" }), _jsx("span", { className: "ContextSwitch_Shadow ContextSwitch_Shadow--bottom" }), _jsx("span", { className: "ContextSwitch_Fill" }), _jsx("span", { className: "ContextSwitch_Light ContextSwitch_Light--top" }), _jsx("span", { className: "ContextSwitch_Light ContextSwitch_Light--bottom" }), _jsx("div", Object.assign({ className: "ContextSwitch_Toggle" }, { children: _jsxs("label", { children: [_jsx("input", { hidden: true, type: "checkbox", checked: isLocalOn, onChange: () => { } }), _jsx("span", { children: children })] }) })), _jsx("span", { className: "ContextSwitch_Trigger ContextSwitch_Trigger--top", onClick: () => onClick(true) }), _jsx("span", { className: "ContextSwitch_Trigger ContextSwitch_Trigger--bottom", onClick: () => onClick(false) }), _jsx("span", { className: "ContextSwitch_Line" })] })));
};
export default ContextSwitch;
