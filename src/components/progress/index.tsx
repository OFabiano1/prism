export type ProgressTone = 'brand' | 'success' | 'warning' | 'danger';

export type ProgressProps = {
  /** 0 a 100. */
  value: number;
  label: string;
  tone?: ProgressTone;
  /** Mostra o valor em texto ao lado do rótulo. */
  showValue?: boolean;
};

/** Barra de progresso determinada. Usa `<progress>` nativo para valor arbitrário e semântica correta. */
export function Progress({ value, label, tone = 'brand', showValue = false }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div className="prism-progress" data-tone={tone}>
      <div className="prism-progress-header">
        <span className="prism-progress-label">{label}</span>
        {showValue ? (
          <span className="prism-progress-value" aria-hidden="true">
            {clamped}%
          </span>
        ) : null}
      </div>
      <progress className="prism-progress-track" value={clamped} max={100} aria-label={label}>
        {clamped}%
      </progress>
    </div>
  );
}
