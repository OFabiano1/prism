import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  size?: BadgeSize;
  /** Ponto colorido antes do texto. */
  dot?: boolean;
  icon?: ReactNode;
};

/** Rótulo curto de estado. Nunca substitui texto explicativo. */
export function Badge({ label, tone = 'neutral', size = 'md', dot = false, icon }: BadgeProps) {
  return (
    <span className="prism-badge" data-tone={tone} data-size={size}>
      {dot ? <span className="prism-badge-dot" aria-hidden="true" /> : null}
      {icon ? <span className="prism-badge-icon" aria-hidden="true">{icon}</span> : null}
      {label}
    </span>
  );
}
