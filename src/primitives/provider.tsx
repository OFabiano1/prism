import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { PrismThemeContext } from '../hooks/use-theme';
import type { PrismTheme } from '../hooks/use-theme';
import { PrismRootContext } from './portal';

export type DesignSystemProviderProps = {
  /** Tema controlado. Escuro é o padrão do PRISM. */
  theme: PrismTheme;
  /** Sempre que o tema puder mudar, passe este callback. */
  onThemeChange?: (theme: PrismTheme) => void;
  children: ReactNode;
};

/**
 * Raiz visual do PRISM. Aplica tokens e tema no wrapper, nunca em
 * `document.documentElement`, e hospeda os portais do sistema.
 */
export function DesignSystemProvider({ theme, onThemeChange, children }: DesignSystemProviderProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (next: PrismTheme) => onThemeChange?.(next),
      canChangeTheme: typeof onThemeChange === 'function',
    }),
    [theme, onThemeChange],
  );

  return (
    <div ref={setContainer} className="prism-root" data-theme={theme}>
      <PrismRootContext.Provider value={container}>
        <PrismThemeContext.Provider value={value}>{children}</PrismThemeContext.Provider>
      </PrismRootContext.Provider>
    </div>
  );
}
