import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { Button } from '.';

describe('Button', () => {
  test('mostra o rótulo e dispara a ação', async () => {
    const onClick = vi.fn();
    render(<Button label="Salvar" onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('loading bloqueia o clique e anuncia o estado', () => {
    render(<Button label="Salvando" loading />);

    const button = screen.getByRole('button', { name: 'Salvando' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  test('disabled não dispara ação', async () => {
    const onClick = vi.fn();
    render(<Button label="Bloqueado" disabled onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Bloqueado' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  test('href renderiza link; external abre em nova aba com rel seguro', () => {
    render(<Button label="Discord" href="https://discord.gg/x" external />);

    const link = screen.getByRole('link', { name: 'Discord' });
    expect(link).toHaveAttribute('href', 'https://discord.gg/x');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('link desabilitado perde o href', () => {
    render(<Button label="Wiki" href="/wiki/" disabled />);

    expect(screen.getByText('Wiki').closest('a')).not.toHaveAttribute('href');
  });
});
