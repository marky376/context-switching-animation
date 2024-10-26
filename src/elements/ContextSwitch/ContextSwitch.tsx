import React from "react";
import "./ContextSwitch.styles.css";
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
  const timer = React.useRef<NodeJS.Timeout | null>(null);
  const isControlled = on !== undefined;
  const isLocalOn = React.useMemo(() => (isControlled ? on : isOn), [on, isOn]);

  const handleToggle = React.useCallback(
    (value: boolean) => {
      if (value === isLocalOn) return;

      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        if (!rootRef.current) return;

        // Set transition duration to zero to prevent flickering
        rootRef.current.style.setProperty("--transition-duration", "0");

        if (!isControlled) {
          setIsOn(!value);
        } else {
          onChange?.(!value);
        }

        // Reset transition duration after state change
        setTimeout(() => {
          if (!rootRef.current) return;
          rootRef.current.style.setProperty("--transition-duration", "");
        }, 100);
      }, 500);

      // This will set the current state
      setIsOn(value);
    },
    [isLocalOn, isControlled, onChange]
  );

  return (
    <div
      ref={rootRef}
      className={clsx("ContextSwitch", isLocalOn && "on")}
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
            readOnly
          />
          <span>{children}</span>
        </label>
      </div>

      <span
        className="ContextSwitch_Trigger ContextSwitch_Trigger--top"
        onClick={() => handleToggle(true)}
      />
      <span
        className="ContextSwitch_Trigger ContextSwitch_Trigger--bottom"
        onClick={() => handleToggle(false)}
      />

      <span className="ContextSwitch_Line" />
    </div>
  );
};

export default ContextSwitch;
