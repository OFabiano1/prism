export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

export type AvatarProps = {
  name: string;
  src?: string;
  size?: AvatarSize;
  /** Anel de status: online, ausente, ocupado. */
  status?: 'online' | 'away' | 'busy';
};

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

/** Avatar com iniciais quando não há imagem. O nome é sempre o texto alternativo. */
export function Avatar({ name, src, size = 'md', status }: AvatarProps) {
  return (
    <span className="prism-avatar" data-size={size}>
      {src ? (
        <img className="prism-avatar-image" src={src} alt={name} loading="lazy" />
      ) : (
        <span className="prism-avatar-fallback" role="img" aria-label={name}>
          {initials(name)}
        </span>
      )}
      {status ? <span className="prism-avatar-status" data-status={status} aria-hidden="true" /> : null}
    </span>
  );
}
