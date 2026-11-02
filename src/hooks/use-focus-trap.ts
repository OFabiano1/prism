import { useEffect } from 'react';
import type { RefObject } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function focusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (element) => element.getAttribute('aria-hidden') !== 'true',
  );
}

/**
 * Prende o foco dentro do container enquanto `active`, e devolve o foco
 * ao elemento anterior quando desativa.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    const node = ref.current;
    if (!active || !node) return;

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const first = focusable(node)[0] ?? node;
    first.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = focusable(node);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const firstItem = items[0]!;
      const lastItem = items[items.length - 1]!;
      const current = document.activeElement;

      if (!event.shiftKey && current === lastItem) {
        event.preventDefault();
        firstItem.focus();
      } else if (event.shiftKey && (current === firstItem || current === node)) {
        event.preventDefault();
        lastItem.focus();
      }
    };

    node.addEventListener('keydown', onKeyDown);
    return () => {
      node.removeEventListener('keydown', onKeyDown);
      previous?.focus();
    };
  }, [active, ref]);
}
