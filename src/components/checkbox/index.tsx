import { useId } from 'react';
import { Check } from 'lucide-react';

export type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
};

/** Caixa de seleção com rótulo clicável e estados nativos preservados. */
export function Checkbox({
  label,
  checked,
  onChange,
  hint,
  error,
  disabled = false,
  required = false,
  name,
}: CheckboxProps) {
  const uid = useId();
  const hintId = `${uid}-hint`;
  const errorId = `${uid}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className="prism-choice" data-invalid={error ? 'true' : undefined}>
      <label className="prism-choice-row">
        <input
          type="checkbox"
          className="prism-choice-input"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          disabled={disabled}
          required={required}
          name={name}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
        />
        <span className="prism-choice-box" aria-hidden="true">
          <Check strokeWidth={2.5} />
        </span>
        <span className="prism-choice-label">{label}</span>
      </label>
      {hint && !error ? (
        <p id={hintId} className="prism-field-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="prism-field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
