import { Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'start' | 'end';
  /** `loading` desabilita o botão e anuncia o estado. */
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  /** Nome acessível quando o rótulo visual não basta. */
  ariaLabel?: string;
};

/** Ação do sistema. Sem classe ou estilo externo: a variante semântica resolve. */
export function Button({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'start',
  loading = false,
  disabled = false,
  type = 'button',
  fullWidth = false,
  ariaLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const iconNode = loading ? (
    <Loader2 className="prism-button-spinner" aria-hidden="true" strokeWidth={2} />
  ) : Icon ? (
    <Icon className="prism-button-icon" aria-hidden="true" strokeWidth={1.75} />
  ) : null;

  return (
    <button
      type={type}
      className="prism-button"
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth ? 'true' : undefined}
      data-loading={loading ? 'true' : undefined}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
    >
      {iconNode && iconPosition === 'start' ? iconNode : null}
      <span className="prism-button-label">{label}</span>
      {iconNode && iconPosition === 'end' ? iconNode : null}
    </button>
  );
}
