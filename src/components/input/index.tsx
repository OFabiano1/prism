import { Field } from '../field';

export type InputType = 'text' | 'password' | 'search' | 'number' | 'email' | 'tel' | 'url';

export type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: InputType;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  autoComplete?: string;
  hideLabel?: boolean;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url' | 'search';
  /** Prefixo visual fixo, como `prism.design/`. */
  prefix?: string;
};

/** Campo de texto do sistema. O rótulo é obrigatório e visível por padrão. */
export function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  name,
  autoComplete,
  hideLabel = false,
  inputMode,
  prefix,
}: InputProps) {
  return (
    <Field label={label} hint={hint} error={error} hideLabel={hideLabel}>
      {({ inputId, describedBy, invalid }) => (
        <div className="prism-input" data-prefix={prefix ? 'true' : undefined}>
          {prefix ? (
            <span className="prism-input-prefix" aria-hidden="true">
              {prefix}
            </span>
          ) : null}
          <input
            id={inputId}
            className="prism-control prism-input-control"
            type={type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            name={name}
            autoComplete={autoComplete}
            inputMode={inputMode}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
          />
        </div>
      )}
    </Field>
  );
}
