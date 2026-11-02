import type { ReactNode } from 'react';

export type CardVariant = 'default' | 'interactive' | 'featured' | 'outlined' | 'elevated' | 'compact';

export type CardProps = {
  variant?: CardVariant;
  as?: 'div' | 'article' | 'section' | 'li';
  children: ReactNode;
};

/** Superfície de conteúdo. Variantes mudam peso, nunca layout de página. */
export function Card({ variant = 'default', as: Tag = 'div', children }: CardProps) {
  return (
    <Tag className="prism-card" data-variant={variant}>
      {children}
    </Tag>
  );
}

export type CardHeaderProps = { title: string; description?: string; meta?: ReactNode };

export function CardHeader({ title, description, meta }: CardHeaderProps) {
  return (
    <header className="prism-card-header">
      <div className="prism-card-heading">
        <h3 className="prism-card-title">{title}</h3>
        {description ? <p className="prism-card-description">{description}</p> : null}
      </div>
      {meta ? <div className="prism-card-meta">{meta}</div> : null}
    </header>
  );
}

export type CardBodyProps = { children: ReactNode };

export function CardBody({ children }: CardBodyProps) {
  return <div className="prism-card-body">{children}</div>;
}

export type CardFooterProps = { children: ReactNode };

export function CardFooter({ children }: CardFooterProps) {
  return <footer className="prism-card-footer">{children}</footer>;
}
