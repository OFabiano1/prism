import { ChevronDown } from 'lucide-react';
import { Field } from '../field';

export type SelectOption = { id: string; label: string; disabled?: boolean };

export type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  hideLabel?: boolean;
  /** `compact` para barras de ferramenta. */
  variant?: 'default' | 'compact';
};

/** Seleção nativa com a aparência do sistema. Teclado e leitor de tela vêm do navegador. */
export function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  hint,
  error,
  disabled = false,
  required = false,
  name,
  hideLabel = false,
  variant = 'default',
}: SelectProps) {
  return (
    <Field label={label} hint={hint} error={error} hideLabel={hideLabel}>
      {({ inputId, describedBy, invalid }) => (
        <div className="prism-select" data-variant={variant}>
          <select
            id={inputId}
            className="prism-control prism-select-control"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            required={required}
            name={name}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options.map((option) => (
              <option key={option.id} value={option.id} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="prism-select-icon" aria-hidden="true" strokeWidth={1.75} />
        </div>
      )}
    </Field>
  );
}
