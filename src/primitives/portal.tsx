import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Container do provider: garante que portais herdem tema e tokens. */
export const PrismRootContext = createContext<HTMLElement | null>(null);

export type PrismPortalProps = { children: ReactNode };

export function PrismPortal({ children }: PrismPortalProps) {
  const container = useContext(PrismRootContext);
  const target = container ?? (typeof document === 'undefined' ? null : document.body);
  if (!target) return null;
  return createPortal(children, target);
}
