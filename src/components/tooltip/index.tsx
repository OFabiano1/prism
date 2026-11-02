import { useId, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { useEscapeKey } from '../../hooks/use-dismiss';

export type TooltipProps = {
  label: string;
  children: ReactElement;
  side?: 'top' | 'bottom';
};

/** Dica curta em hover e foco. Fecha em Esc; nunca é o único caminho para a informação. */
export function Tooltip({ label, children, side = 'top' }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLSpanElement>(null);

  useEscapeKey(() => setOpen(false), open);

  return (
    <span
      ref={wrapper}
      className="prism-tooltip"
      data-side={side}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>
      {open ? (
        <span className="prism-tooltip-surface" role="tooltip" id={id}>
          {label}
        </span>
      ) : null}
    </span>
  );
}
