import { useId } from 'react';

export type RadioOption = { id: string; label: string; disabled?: boolean };

export type RadioGroupProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly RadioOption[];
  hint?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
  /** Em linha, para grupos curtos. */
  inline?: boolean;
};

/** Grupo de rádio com `fieldset`/`legend`; a seta do teclado vem do navegador. */
export function RadioGroup({
  label,
  value,
  onChange,
  options,
  hint,
  error,
  disabled = false,
  name,
  inline = false,
}: RadioGroupProps) {
  const uid = useId();
  const hintId = `${uid}-hint`;
  const errorId = `${uid}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <fieldset
      className="prism-radio-group"
      data-inline={inline ? 'true' : 'false'}
      data-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
    >
      <legend className="prism-field-label">{label}</legend>
      {options.map((option) => (
        <label className="prism-choice-row" key={option.id}>
          <input
            type="radio"
            className="prism-choice-input prism-choice-input-radio"
            name={name ?? uid}
            value={option.id}
            checked={value === option.id}
            onChange={() => onChange(option.id)}
            disabled={disabled || option.disabled}
          />
          <span className="prism-choice-box prism-choice-dot" aria-hidden="true" />
          <span className="prism-choice-label">{option.label}</span>
        </label>
      ))}
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
    </fieldset>
  );
}
