import type { ReactNode } from 'react';

export type SpaceStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

export type StackProps = {
  gap?: SpaceStep;
  align?: 'stretch' | 'start' | 'center' | 'end';
  as?: 'div' | 'section' | 'article' | 'ul' | 'form';
  children: ReactNode;
};

/** Empilha conteúdo na vertical com o espaçamento do sistema. */
export function Stack({ gap = 4, align = 'stretch', as: Tag = 'div', children }: StackProps) {
  return (
    <Tag className="prism-stack" data-gap={gap} data-align={align}>
      {children}
    </Tag>
  );
}
