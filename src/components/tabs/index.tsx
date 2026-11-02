import { useId, useRef } from 'react';
import type { ReactNode } from 'react';

export type TabItem = { id: string; label: string; disabled?: boolean };

export type TabsProps = {
  label: string;
  items: readonly TabItem[];
  value: string;
  onChange: (id: string) => void;
  children?: ReactNode;
};

/** Abas com roving tabindex, setas, Home e End. O painel acompanha o valor controlado. */
export function Tabs({ label, items, value, onChange, children }: TabsProps) {
  const baseId = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (direction: 1 | -1 | 'first' | 'last') => {
    const enabled = items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.disabled);
    if (enabled.length === 0) return;

    const currentIndex = items.findIndex((item) => item.id === value);
    const currentPosition = enabled.findIndex(({ index }) => index === currentIndex);
    let nextPosition = 0;
    if (direction === 'first') nextPosition = 0;
    else if (direction === 'last') nextPosition = enabled.length - 1;
    else nextPosition = (Math.max(0, currentPosition) + direction + enabled.length) % enabled.length;

    const next = enabled[nextPosition]!;
    refs.current[next.index]?.focus();
    onChange(next.item.id);
  };

  return (
    <div className="prism-tabs">
      <div className="prism-tabs-list" role="tablist" aria-label={label}>
        {items.map((item, index) => {
          const selected = item.id === value;
          return (
            <button
              key={item.id}
              ref={(node) => {
                refs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className="prism-tab"
              disabled={item.disabled}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  move(1);
                } else if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  move(-1);
                } else if (event.key === 'Home') {
                  event.preventDefault();
                  move('first');
                } else if (event.key === 'End') {
                  event.preventDefault();
                  move('last');
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {children ? (
        <div
          className="prism-tabs-panel"
          role="tabpanel"
          id={`${baseId}-panel-${value}`}
          aria-labelledby={`${baseId}-tab-${value}`}
          tabIndex={0}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
