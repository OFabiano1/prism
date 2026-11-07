import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { Switch } from '.';

function Harness() {
  const [checked, setChecked] = useState(false);
  return <Switch label="Avisar por e-mail" checked={checked} onChange={setChecked} />;
}

describe('Switch', () => {
  test('alterna pelo clique e anuncia o estado', async () => {
    render(<Harness />);

    const control = screen.getByRole('switch', { name: 'Avisar por e-mail' });
    expect(control).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(control);

    expect(control).toHaveAttribute('aria-checked', 'true');
  });

  test('desabilitado não alterna', async () => {
    const checked = false;
    const onChange = () => undefined;
    render(<Switch label="Bloqueado" checked={checked} onChange={onChange} disabled />);

    const control = screen.getByRole('switch', { name: 'Bloqueado' });
    await userEvent.click(control);

    expect(control).toBeDisabled();
    expect(control).toHaveAttribute('aria-checked', 'false');
  });
});
