import { useId } from 'react';
import type { ReactNode } from 'react';

export type FieldIds = {
  inputId: string;
  describedBy: string | undefined;
  invalid: boolean;
};

export type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  /** Esconde o rótulo visualmente, mantendo o nome acessível. */
  hideLabel?: boolean;
  children: (ids: FieldIds) => ReactNode;
};

/**
 * Rótulo, dica e erro de um controle de formulário.
 * Gera os ids e liga tudo por `aria-describedby`, sem duplicar lógica em cada campo.
 */
export function Field({ label, hint, error, hideLabel = false, children }: FieldProps) {
  const uid = useId();
  const inputId = `prism-field-${uid}`;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className="prism-field" data-invalid={error ? 'true' : undefined}>
      <label className={hideLabel ? 'prism-visually-hidden' : 'prism-field-label'} htmlFor={inputId}>
        {label}
      </label>
      {children({ inputId, describedBy, invalid: Boolean(error) })}
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
