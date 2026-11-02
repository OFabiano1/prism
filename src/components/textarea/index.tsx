import { Field } from '../field';

export type TextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  rows?: number;
  maxLength?: number;
  hideLabel?: boolean;
};

/** Área de texto do sistema. */
export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  name,
  rows = 4,
  maxLength,
  hideLabel = false,
}: TextareaProps) {
  return (
    <Field label={label} hint={hint} error={error} hideLabel={hideLabel}>
      {({ inputId, describedBy, invalid }) => (
        <textarea
          id={inputId}
          className="prism-control prism-textarea"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          name={name}
          rows={rows}
          maxLength={maxLength}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
        />
      )}
    </Field>
  );
}
