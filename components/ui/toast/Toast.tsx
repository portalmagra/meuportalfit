// =============================================================================
// MEUPORTALFIT - SISTEMA DE TOAST/NOTIFICAÇÕES
// =============================================================================

import React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// VARIANTES DO TOAST
// -----------------------------------------------------------------------------
const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-4',
    'overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=move]:transition-none',
    'data-[state=open]:animate-slide-up',
    'data-[state=closed]:animate-fade-out'
  ],
  {
    variants: {
      variant: {
        default: [
          'border-gray-200 bg-white text-gray-900'
        ],
        success: [
          'border-success-200 bg-success-50 text-success-900'
        ],
        error: [
          'border-error-200 bg-error-50 text-error-900'
        ],
        warning: [
          'border-warning-200 bg-warning-50 text-warning-900'
        ],
        info: [
          'border-primary-200 bg-primary-50 text-primary-900'
        ]
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

// -----------------------------------------------------------------------------
// INTERFACES
// -----------------------------------------------------------------------------
export interface ToastProps extends VariantProps<typeof toastVariants> {
  id?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  duration?: number;
  persistent?: boolean;
  onClose?: () => void;
  className?: string;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

export interface ToastItem extends ToastProps {
  id: string;
  createdAt: Date;
}

// -----------------------------------------------------------------------------
// CONTEXTO DO TOAST
// -----------------------------------------------------------------------------
const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// -----------------------------------------------------------------------------
// PROVIDER DO TOAST
// -----------------------------------------------------------------------------
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  
  const addToast = React.useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastItem = {
      ...toast,
      id,
      createdAt: new Date()
    };
    
    setToasts(prev => [newToast, ...prev]);
    
    // Auto-remove após duração especificada
    if (!toast.persistent && toast.duration !== 0) {
      const duration = toast.duration || 5000;
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  }, []);
  
  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  const clearAll = React.useCallback(() => {
    setToasts([]);
  }, []);
  
  const value = React.useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      clearAll
    }),
    [toasts, addToast, removeToast, clearAll]
  );
  
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE TOAST INDIVIDUAL
// -----------------------------------------------------------------------------
const Toast: React.FC<ToastProps & { onClose?: () => void }> = ({
  variant,
  title,
  description,
  action,
  icon,
  onClose,
  className,
  ...props
}) => {
  // Ícones padrão baseados na variante
  const getDefaultIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-success-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-error-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-warning-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  return (
    <div
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      {/* Ícone */}
      <div className="flex-shrink-0">
        {icon || getDefaultIcon()}
      </div>
      
      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="text-sm font-semibold leading-none mb-1">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm opacity-90">
            {description}
          </div>
        )}
      </div>
      
      {/* Ação personalizada */}
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
      
      {/* Botão fechar */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Fechar notificação"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// CONTAINER DE TOASTS
// -----------------------------------------------------------------------------
const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();
  const [portalElement, setPortalElement] = React.useState<HTMLElement | null>(null);
  
  React.useEffect(() => {
    let element = document.getElementById('toast-root');
    
    if (!element) {
      element = document.createElement('div');
      element.id = 'toast-root';
      document.body.appendChild(element);
    }
    
    setPortalElement(element);
  }, []);
  
  if (!portalElement || toasts.length === 0) {
    return null;
  }
  
  return createPortal(
    <div
      className="fixed top-0 right-0 z-toast flex flex-col items-end gap-2 p-4 w-full max-w-sm pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto animate-slide-up w-full max-w-sm"
        >
          <Toast
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>,
    portalElement
  );
};

// -----------------------------------------------------------------------------
// FUNÇÕES HELPER PARA TOAST
// -----------------------------------------------------------------------------
export const toast = {
  // Toast de sucesso
  success: (
    message: string,
    options?: Partial<Omit<ToastProps, 'variant' | 'description'>>
  ) => {
    const { addToast } = useToastContext();
    return addToast({
      variant: 'success',
      description: message,
      duration: 5000,
      ...options
    });
  },
  
  // Toast de erro
  error: (
    message: string,
    options?: Partial<Omit<ToastProps, 'variant' | 'description'>>
  ) => {
    const { addToast } = useToastContext();
    return addToast({
      variant: 'error',
      description: message,
      duration: 7000,
      ...options
    });
  },
  
  // Toast de aviso
  warning: (
    message: string,
    options?: Partial<Omit<ToastProps, 'variant' | 'description'>>
  ) => {
    const { addToast } = useToastContext();
    return addToast({
      variant: 'warning',
      description: message,
      duration: 6000,
      ...options
    });
  },
  
  // Toast de informação
  info: (
    message: string,
    options?: Partial<Omit<ToastProps, 'variant' | 'description'>>
  ) => {
    const { addToast } = useToastContext();
    return addToast({
      variant: 'info',
      description: message,
      duration: 5000,
      ...options
    });
  },
  
  // Toast padrão
  message: (
    message: string,
    options?: Partial<Omit<ToastProps, 'description'>>
  ) => {
    const { addToast } = useToastContext();
    return addToast({
      variant: 'default',
      description: message,
      duration: 4000,
      ...options
    });
  },
  
  // Toast personalizado
  custom: (options: Omit<ToastProps, 'id'>) => {
    const { addToast } = useToastContext();
    return addToast(options);
  },
  
  // Toast de loading
  loading: (
    message: string,
    options?: Partial<Omit<ToastProps, 'variant' | 'description' | 'icon' | 'persistent'>>
  ) => {
    const { addToast } = useToastContext();
    return addToast({
      variant: 'default',
      description: message,
      persistent: true,
      icon: (
        <svg className="w-5 h-5 animate-spin text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      ...options
    });
  },
  
  // Promessa com toast
  promise: async <T,>(
    promise: Promise<T>,
    {
      loading,
      success,
      error
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ): Promise<T> => {
    const { addToast, removeToast } = useToastContext();
    
    const toastId = addToast({
      variant: 'default',
      description: loading,
      persistent: true,
      icon: (
        <svg className="w-5 h-5 animate-spin text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    });
    
    try {
      const result = await promise;
      removeToast(toastId);
      
      addToast({
        variant: 'success',
        description: typeof success === 'function' ? success(result) : success,
        duration: 5000
      });
      
      return result;
    } catch (err) {
      removeToast(toastId);
      
      addToast({
        variant: 'error',
        description: typeof error === 'function' ? error(err) : error,
        duration: 7000
      });
      
      throw err;
    }
  }
};

// Hook interno para usar o contexto
const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('Toast functions must be used within a ToastProvider');
  }
  return context;
};

// -----------------------------------------------------------------------------
// COMPONENTES PRÉ-CONFIGURADOS
// -----------------------------------------------------------------------------

// Toast de confirmação com ações
export interface ConfirmToastProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'warning' | 'error' | 'info';
}

export const useConfirmToast = () => {
  const { addToast, removeToast } = useToast();
  
  const showConfirm = React.useCallback((props: ConfirmToastProps) => {
    const toastId = addToast({
      variant: props.variant || 'warning',
      title: props.title,
      description: props.description,
      persistent: true,
      action: (
        <div className="flex gap-2">
          <button
            onClick={() => {
              props.onConfirm();
              removeToast(toastId);
            }}
            className="text-xs bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600"
          >
            {props.confirmText || 'Confirmar'}
          </button>
          <button
            onClick={() => {
              props.onCancel?.();
              removeToast(toastId);
            }}
            className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
          >
            {props.cancelText || 'Cancelar'}
          </button>
        </div>
      )
    });
    
    return toastId;
  }, [addToast, removeToast]);
  
  return { showConfirm };
};

// Toast para quiz
export const useQuizToast = () => {
  const { addToast } = useToast();
  
  const showQuizComplete = (score: number, totalQuestions: number) => {
    return addToast({
      variant: 'success',
      title: 'Quiz Concluído! 🎉',
      description: `Você respondeu ${score}/${totalQuestions} perguntas`,
      duration: 8000,
      action: (
        <div className="text-xs bg-primary-500 text-white px-3 py-1 rounded">
          Ver Resultados
        </div>
      )
    });
  };
  
  const showQuizError = (error: string) => {
    return addToast({
      variant: 'error',
      title: 'Erro no Quiz',
      description: error,
      duration: 7000
    });
  };
  
  const showQuizSaved = () => {
    return addToast({
      variant: 'info',
      title: 'Progresso Salvo',
      description: 'Você pode continuar o quiz mais tarde',
      duration: 5000
    });
  };
  
  return {
    showQuizComplete,
    showQuizError,
    showQuizSaved
  };
};

// -----------------------------------------------------------------------------
// ESTILOS CUSTOMIZADOS PARA ANIMAÇÕES
// -----------------------------------------------------------------------------
export const toastStyles = `
  @keyframes slide-up {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
  
  .animate-fade-out {
    animation: fade-out 0.2s ease-in;
  }
`;

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------
export {
  Toast,
  ToastProvider,
  ToastContainer,
  toastVariants,
  type ToastContextValue,
  type ToastItem
};

export default Toast;