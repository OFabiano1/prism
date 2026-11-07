import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { ToastProvider, useToast } from '.';

function Trigger() {
  const { show } = useToast();
  return (
    <button
      type="button"
      onClick={() => show({ title: 'Rascunho salvo', description: 'O texto está atualizado.', durationMs: 0 })}
    >
      Abrir
    </button>
  );
}

describe('Toast', () => {
  test('mostra e fecha o aviso', async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.getByText('Rascunho salvo')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Fechar aviso: Rascunho salvo' }));
    expect(screen.queryByText('Rascunho salvo')).not.toBeInTheDocument();
  });

  test('useToast fora do provider falha com mensagem clara', () => {
    const consoleError = console.error;
    console.error = () => undefined;

    try {
      expect(() => render(<Trigger />)).toThrow('useToast precisa estar dentro de <ToastProvider>.');
    } finally {
      console.error = consoleError;
    }
  });
});
