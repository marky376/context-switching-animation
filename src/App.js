import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ContextSwitch from "./elements/ContextSwitch/ContextSwitch";
import "./styles.css";
export default function App() {
    const [darkMode, setDarkMode] = React.useState(true);
    document.documentElement.classList.toggle("dark", darkMode);
    const handleChange = React.useCallback((isOn) => {
        setDarkMode(isOn);
        document.documentElement.classList.toggle("dark", isOn);
    }, [darkMode]);
    return (_jsxs("div", Object.assign({ className: "App" }, { children: [_jsx("img", { className: "img", src: "https://pbs.twimg.com/media/GaHNPI1WUAANFRC?format=jpg&name=4096x4096" }), _jsx(ContextSwitch, { on: !darkMode, onChange: handleChange })] })));
}
