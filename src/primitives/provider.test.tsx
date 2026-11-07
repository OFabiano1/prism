import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { DesignSystemProvider } from './provider';
import { useTheme } from '../hooks/use-theme';
import type { PrismTheme } from '../hooks/use-theme';

function ThemeProbe() {
  const { theme, setTheme, canChangeTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="can-change">{canChangeTheme ? 'sim' : 'não'}</span>
      <button type="button" onClick={() => setTheme('light')}>
        Trocar
      </button>
    </div>
  );
}

function Harness() {
  const [theme, setTheme] = useState<PrismTheme>('dark');
  return (
    <DesignSystemProvider theme={theme} onThemeChange={setTheme}>
      <ThemeProbe />
    </DesignSystemProvider>
  );
}

describe('DesignSystemProvider', () => {
  test('aplica o tema no wrapper e entrega o controle ao app', async () => {
    const { container } = render(<Harness />);
    const root = container.querySelector('.prism-root');

    expect(root).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByTestId('can-change')).toHaveTextContent('sim');

    await userEvent.click(screen.getByRole('button', { name: 'Trocar' }));

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(root).toHaveAttribute('data-theme', 'light');
  });

  test('sem onThemeChange, a troca fica indisponível', () => {
    render(
      <DesignSystemProvider theme="light">
        <ThemeProbe />
      </DesignSystemProvider>,
    );

    expect(screen.getByTestId('can-change')).toHaveTextContent('não');
  });
});
