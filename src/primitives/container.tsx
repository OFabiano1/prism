import type { ReactNode } from 'react';

export type ContainerProps = { as?: 'div' | 'main' | 'section' | 'header' | 'footer'; children: ReactNode };

/** Largura máxima do sistema, centralizada, com gutter responsivo. */
export function Container({ as: Tag = 'div', children }: ContainerProps) {
  return <Tag className="prism-container">{children}</Tag>;
}

export type VisuallyHiddenProps = { children: ReactNode };

/** Texto só para leitores de tela. */
export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className="prism-visually-hidden">{children}</span>;
}
