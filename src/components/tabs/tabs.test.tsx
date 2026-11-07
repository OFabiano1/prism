import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { Tabs } from '.';

const ITEMS = [
  { id: 'resumo', label: 'Resumo' },
  { id: 'atividade', label: 'Atividade' },
  { id: 'config', label: 'Configuração' },
];

function Harness() {
  const [value, setValue] = useState('resumo');
  return (
    <Tabs label="Detalhe" items={ITEMS} value={value} onChange={setValue}>
      <p>Painel {value}</p>
    </Tabs>
  );
}

describe('Tabs', () => {
  test('seta direita troca a aba ativa e move o foco', async () => {
    render(<Harness />);

    const first = screen.getByRole('tab', { name: 'Resumo' });
    first.focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Atividade' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Atividade' })).toHaveFocus();
    expect(screen.getByText('Painel atividade')).toBeInTheDocument();
  });

  test('End vai para a última aba e Home volta para a primeira', async () => {
    render(<Harness />);

    screen.getByRole('tab', { name: 'Resumo' }).focus();
    await userEvent.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Configuração' })).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Resumo' })).toHaveAttribute('aria-selected', 'true');
  });

  test('só a aba ativa entra na ordem do Tab', () => {
    render(<Harness />);

    expect(screen.getByRole('tab', { name: 'Resumo' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Atividade' })).toHaveAttribute('tabindex', '-1');
  });
});
