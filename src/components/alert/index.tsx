import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export type AlertProps = {
  tone?: AlertTone;
  title: string;
  description?: string;
  /** Ação opcional, como um botão de desfazer. */
  action?: ReactNode;
  /** Remove o ícone. O tom continua identificado por texto e cor. */
  hideIcon?: boolean;
};

const ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
} as const;

/** Mensagem persistente na página. Para mensagem temporária, use Toast. */
export function Alert({ tone = 'info', title, description, action, hideIcon = false }: AlertProps) {
  const Icon = ICONS[tone];
  return (
    <div className="prism-alert" data-tone={tone} role={tone === 'danger' ? 'alert' : 'status'}>
      {hideIcon ? null : <Icon className="prism-alert-icon" aria-hidden="true" strokeWidth={1.75} />}
      <div className="prism-alert-content">
        <p className="prism-alert-title">{title}</p>
        {description ? <p className="prism-alert-description">{description}</p> : null}
      </div>
      {action ? <div className="prism-alert-action">{action}</div> : null}
    </div>
  );
}
