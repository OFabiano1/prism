import type { ReactNode } from 'react';
import type { SpaceStep } from './stack';

export type GridProps = {
  /** Colunas no desktop. Em telas menores o grid reduz sozinho. */
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: SpaceStep;
  as?: 'div' | 'section' | 'ul';
  children: ReactNode;
};

/** Grade do sistema. Nunca usa `style` inline. */
export function Grid({ columns = 2, gap = 4, as: Tag = 'div', children }: GridProps) {
  return (
    <Tag className="prism-grid" data-columns={columns} data-gap={gap}>
      {children}
    </Tag>
  );
}
