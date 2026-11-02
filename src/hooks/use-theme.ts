import { createContext, useContext } from 'react';

export type PrismTheme = 'dark' | 'light';

export type PrismThemeContextValue = {
  theme: PrismTheme;
  setTheme: (theme: PrismTheme) => void;
  canChangeTheme: boolean;
};

export const PrismThemeContext = createContext<PrismThemeContextValue>({
  theme: 'dark',
  setTheme: () => undefined,
  canChangeTheme: false,
});

export function useTheme(): PrismThemeContextValue {
  return useContext(PrismThemeContext);
}
