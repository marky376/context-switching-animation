import React from "react";

import ContextSwitch from "./elements/ContextSwitch/ContextSwitch";
import "./styles.css";

export default function App() {
  const [darkMode, setDarkMode] = React.useState(true);

  document.documentElement.classList.toggle("dark", darkMode);

  const handleChange = React.useCallback<(isOn: boolean) => void>(
    (isOn) => {
      setDarkMode(() => isOn);
      document.documentElement.classList.toggle("dark", isOn);
    },
    []
  );

  return (
    <div className="App">
      <img
        className="img"
        src="https://pbs.twimg.com/media/GaHNPI1WUAANFRC?format=jpg&name=4096x4096"
      />
      <ContextSwitch on={!darkMode} onChange={handleChange} />
    </div>
  );
}
