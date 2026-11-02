import { Loader2 } from 'lucide-react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerProps = {
  label?: string;
  size?: SpinnerSize;
};

/** Indicador de carregamento. Sem rótulo, fica decorativo. */
export function Spinner({ label = 'Carregando', size = 'md' }: SpinnerProps) {
  return (
    <span className="prism-spinner" data-size={size} role="status" aria-label={label}>
      <Loader2 aria-hidden="true" strokeWidth={2} />
    </span>
  );
}

export type SkeletonProps = {
  /** Linhas de texto simuladas. */
  lines?: number;
  /** `title` para um bloco curto; `block` para mídia. */
  shape?: 'title' | 'text' | 'block' | 'avatar';
};

/** Placeholder de carregamento. Nunca inventa conteúdo. */
export function Skeleton({ lines = 1, shape = 'text' }: SkeletonProps) {
  return (
    <span className="prism-skeleton" data-shape={shape} aria-hidden="true">
      {Array.from({ length: shape === 'text' ? lines : 1 }, (_, index) => (
        <span className="prism-skeleton-line" key={index} />
      ))}
    </span>
  );
}
