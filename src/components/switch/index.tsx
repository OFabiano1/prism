import { useId } from 'react';

export type SwitchProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
  disabled?: boolean;
  /** Nome acessível quando o rótulo visual é omitido. */
  hideLabel?: boolean;
};

/** Interruptor on/off. `role="switch"` com estado anunciado. */
export function Switch({
  label,
  checked,
  onChange,
  hint,
  disabled = false,
  hideLabel = false,
}: SwitchProps) {
  const uid = useId();
  const hintId = `${uid}-hint`;
  const labelId = `${uid}-label`;

  return (
    <div className="prism-switch" data-disabled={disabled ? 'true' : undefined}>
      <button
        type="button"
        role="switch"
        className="prism-switch-track"
        aria-checked={checked}
        aria-label={hideLabel ? label : undefined}
        aria-labelledby={hideLabel ? undefined : labelId}
        aria-describedby={hint ? hintId : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
      >
        <span className="prism-switch-thumb" aria-hidden="true" />
      </button>
      {hideLabel ? null : <span id={labelId} className="prism-choice-label">{label}</span>}
      {hint ? (
        <p id={hintId} className="prism-field-hint prism-switch-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
