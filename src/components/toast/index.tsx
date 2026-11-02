import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { PrismPortal } from '../../primitives/portal';
import { useReducedMotion } from '../../hooks/use-reduced-motion';

export type ToastTone = 'neutral' | 'success' | 'danger';
export type ToastOptions = {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** Padrão: 5000 ms. Use 0 para não fechar sozinho. */
  durationMs?: number;
};

type ToastRecord = ToastOptions & { id: string };

type ToastContextValue = {
  show: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let counter = 0;

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast precisa estar dentro de <ToastProvider>.');
  }
  return context;
}

export type ToastProviderProps = { children: ReactNode };

/** Fila de avisos temporários com live region e fechamento manual. */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const reducedMotion = useReducedMotion();

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (options: ToastOptions) => {
      const id = `prism-toast-${++counter}`;
      setToasts((current) => [...current, { ...options, id }]);
      const duration = options.durationMs ?? 5000;
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      }
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <PrismPortal>
        <div className="prism-toast-viewport" aria-live="polite" aria-atomic="false">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="prism-toast"
              data-tone={toast.tone ?? 'neutral'}
              data-motion={reducedMotion ? 'reduced' : 'full'}
              role="status"
            >
              <div className="prism-toast-content">
                <p className="prism-toast-title">{toast.title}</p>
                {toast.description ? (
                  <p className="prism-toast-description">{toast.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                className="prism-toast-close"
                onClick={() => dismiss(toast.id)}
                aria-label={`Fechar aviso: ${toast.title}`}
              >
                <X aria-hidden="true" strokeWidth={1.75} />
              </button>
            </div>
          ))}
        </div>
      </PrismPortal>
    </ToastContext.Provider>
  );
}
