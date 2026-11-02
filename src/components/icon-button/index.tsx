import type { LucideIcon } from 'lucide-react';

export type IconButtonVariant = 'ghost' | 'outline' | 'secondary';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export type IconButtonProps = {
  /** Nome acessível obrigatório: o botão não tem texto visível. */
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  type?: 'button' | 'submit';
};

/** Botão só de ícone. O rótulo é obrigatório e vira `aria-label`. */
export function IconButton({
  label,
  icon: Icon,
  onClick,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  type = 'button',
}: IconButtonProps) {
  return (
    <button
      type={type}
      className="prism-icon-button"
      data-variant={variant}
      data-size={size}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      <Icon aria-hidden="true" strokeWidth={1.75} />
    </button>
  );
}
