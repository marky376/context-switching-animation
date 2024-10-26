import React from "react";
import "./ContextSwitch.styles.css";
import "./styles/Shadow.styles.css";
import "./styles/ToggleOn.styles.css";
import "./styles/ToggleOff.styles.css";
import "./styles/Fill.styles.css";
import "./styles/LightOn.styles.css";
import "./styles/LightOff.styles.css";
import clsx from "clsx";

type ContextSwitchProps = React.PropsWithChildren<{
  on?: boolean;
  defaultOn?: boolean;
  onChange?: (isOn: boolean) => void;
}>;

const ContextSwitch = ({
  children,
  on,
  defaultOn = true,
  onChange,
  ...props
}: ContextSwitchProps) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [isOn, setIsOn] = React.useState(defaultOn);
  const timer = React.useRef(0);
  const isControlled = on !== undefined;
  const isLocalOn = React.useMemo(() => (isControlled ? on : isOn), [on, isOn]);
  const [isChecked, setIsChecked] = React.useState(isLocalOn);

  console.log("isLocalOn", { isLocalOn });

  const onClick = React.useCallback(
    (value: boolean) => {
      console.log("isLocalOn", { value, isChecked, isLocalOn, isControlled });
      if (value === isChecked) return;

      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        if (!rootRef.current) return;
        rootRef.current.style.setProperty("--transition-duration", "0");

        if (!isControlled) {
          setIsOn(!value);
        } else {
          onChange?.(!value);
        }

        setTimeout(() => {
          if (!rootRef.current) return;
          rootRef.current?.style.setProperty("--transition-duration", "");
        }, 100);
      }, 500);

      setIsChecked(value);
    },
    [isLocalOn, isChecked, onChange]
  );

  return (
    <div
      ref={rootRef}
      className={clsx(
        "ContextSwitch",
        isChecked && "checked",
        isLocalOn && "on"
      )}
      {...props}
    >
      <span className="ContextSwitch_Shadow ContextSwitch_Shadow--top" />
      <span className="ContextSwitch_Shadow ContextSwitch_Shadow--bottom" />

      <span className="ContextSwitch_Fill" />

      <span className="ContextSwitch_Light ContextSwitch_Light--top" />
      <span className="ContextSwitch_Light ContextSwitch_Light--bottom" />

      <div className="ContextSwitch_Toggle">
        <label>
          <input
            hidden
            type="checkbox"
            checked={isLocalOn}
            onChange={() => {}}
          />
          <span>{children}</span>
        </label>
      </div>

      <span
        className="ContextSwitch_Trigger ContextSwitch_Trigger--top"
        onClick={() => onClick(true)}
      />
      <span
        className="ContextSwitch_Trigger ContextSwitch_Trigger--bottom"
        onClick={() => onClick(false)}
      />

      <span className="ContextSwitch_Line" />
    </div>
  );
};

export default ContextSwitch;
