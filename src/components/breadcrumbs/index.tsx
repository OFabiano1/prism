import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = { label: string; href?: string };

export type BreadcrumbsProps = {
  label?: string;
  items: readonly BreadcrumbItem[];
};

/** Trilha de navegação. O último item é a página atual, sem link. */
export function Breadcrumbs({ label = 'Trilha de navegação', items }: BreadcrumbsProps) {
  return (
    <nav className="prism-breadcrumbs" aria-label={label}>
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {item.href && !last ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              )}
              {last ? null : <ChevronRight className="prism-breadcrumbs-separator" aria-hidden="true" strokeWidth={1.75} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
