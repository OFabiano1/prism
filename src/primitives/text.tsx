import type { ElementType, ReactNode } from 'react';

export type TextSize =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'overline';

export type TextTone = 'default' | 'secondary' | 'muted' | 'brand';

export type TextProps = {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'strong' | 'label' | 'li';
  size?: TextSize;
  tone?: TextTone;
  /** Fonte mono para código, identificadores e metadados. */
  mono?: boolean;
  /** Recorta o texto com reticências em uma linha. */
  truncate?: boolean;
  id?: string;
  children: ReactNode;
};

/** Tipografia do sistema. Não aceita classe nem estilo externo. */
export function Text({
  as: Tag = 'p',
  size = 'body',
  tone = 'default',
  mono = false,
  truncate = false,
  id,
  children,
}: TextProps) {
  const Component = Tag as ElementType;
  return (
    <Component
      id={id}
      className="prism-text"
      data-size={size}
      data-tone={tone === 'default' ? undefined : tone}
      data-mono={mono ? 'true' : undefined}
      data-truncate={truncate ? 'true' : undefined}
    >
      {children}
    </Component>
  );
}
