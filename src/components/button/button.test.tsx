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
});
