import type { ReactNode } from 'react';
import type { SpaceStep } from './stack';

export type InlineProps = {
  gap?: SpaceStep;
  align?: 'start' | 'center' | 'end' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
  children: ReactNode;
};

/** Alinha conteúdo na horizontal, com quebra controlada. */
export function Inline({
  gap = 3,
  align = 'center',
  justify = 'start',
  wrap = true,
  children,
}: InlineProps) {
  return (
    <div
      className="prism-inline"
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap ? 'true' : 'false'}
    >
      {children}
    </div>
  );
}
