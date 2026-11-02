import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Chama `handler` em Esc quando `active`. */
export function useEscapeKey(handler: () => void, active = true): void {
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active, handler]);
}

/** Chama `handler` em clique ou foco fora do elemento. */
export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  active = true,
): void {
  useEffect(() => {
    if (!active) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const node = ref.current;
      if (!node) return;
      if (event.target instanceof Node && !node.contains(event.target)) handler();
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [active, handler, ref]);
}
