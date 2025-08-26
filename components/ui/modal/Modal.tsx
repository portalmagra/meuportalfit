// =============================================================================
// MEUPORTALFIT - COMPONENTE MODAL BASE
// =============================================================================

import React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// VARIANTES DO MODAL
// -----------------------------------------------------------------------------
const modalVariants = cva(
  // Base styles
  [
    'fixed inset-0 z-modal',
    'flex items-center justify-center',
    'p-4 sm:p-6'
  ]
);

const overlayVariants = cva(
  // Base styles para overlay
  [
    'fixed inset-0 z-modal',
    'bg-black/50 backdrop-blur-sm',
    'transition-opacity duration-300'
  ],
  {
    variants: {
      visible: {
        true: 'opacity-100',
        false: 'opacity-0'
      }
    }
  }
);

const contentVariants = cva(
  // Base styles para conteúdo
  [
    'relative z-modal bg-white rounded-xl shadow-2xl',
    'transition-all duration-300 transform',
    'max-h-[90vh] overflow-y-auto',
    'w-full'
  ],
  {
    variants: {
      size: {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        full: 'max-w-full m-4',
        screen: 'h-screen max-w-full m-0 rounded-none'
      },
      
      centered: {
        true: '',
        false: 'mt-16 mb-4'
      },
      
      visible: {
        true: 'opacity-100 scale-100 translate-y-0',
        false: 'opacity-0 scale-95 translate-y-4'
      }
    },
    
    defaultVariants: {
      size: 'md',
      centered: true,
      visible: true
    }
  }
);

// -----------------------------------------------------------------------------
// INTERFACES
// -----------------------------------------------------------------------------
export interface ModalProps extends VariantProps<typeof contentVariants> {
  // Estado
  isOpen: boolean;
  onClose: () => void;
  
  // Conteúdo
  title?: string;
  description?: string;
  children: React.ReactNode;
  
  // Comportamento
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventClose?: boolean;
  
  // Estilo
  className?: string;
  overlayClassName?: string;
  
  // Callbacks
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
  
  // Acessibilidade
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

// -----------------------------------------------------------------------------
// HOOK PARA GERENCIAR PORTAL
// -----------------------------------------------------------------------------
const usePortal = () => {
  const [portalElement, setPortalElement] = React.useState<HTMLElement | null>(null);
  
  React.useEffect(() => {
    // Cria ou encontra o elemento portal
    let element = document.getElementById('modal-root');
    
    if (!element) {
      element = document.createElement('div');
      element.id = 'modal-root';
      document.body.appendChild(element);
    }
    
    setPortalElement(element);
    
    // Cleanup não é necessário pois o elemento fica no DOM
  }, []);
  
  return portalElement;
};

// -----------------------------------------------------------------------------
// HOOK PARA GERENCIAR ESTADO DO MODAL
// -----------------------------------------------------------------------------
const useModalState = (
  isOpen: boolean,
  onClose: () => void,
  closeOnEscape: boolean,
  preventClose: boolean,
  onAfterOpen?: () => void,
  onAfterClose?: () => void
) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const lastActiveElement = React.useRef<HTMLElement | null>(null);
  
  // Controla animações e mounting
  React.useEffect(() => {
    if (isOpen) {
      // Salva o elemento ativo atual para restaurar depois
      lastActiveElement.current = document.activeElement as HTMLElement;
      
      setIsMounted(true);
      
      // Pequeno delay para permitir mounting antes da animação
      const timer = setTimeout(() => {
        setIsVisible(true);
        onAfterOpen?.();
      }, 10);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      
      // Aguarda animação antes de desmountar
      const timer = setTimeout(() => {
        setIsMounted(false);
        onAfterClose?.();
        
        // Restaura foco ao elemento anterior
        if (lastActiveElement.current) {
          lastActiveElement.current.focus();
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onAfterOpen, onAfterClose]);
  
  // Gerencia foco e body scroll
  React.useEffect(() => {
    if (isOpen) {
      // Previne scroll do body
      document.body.style.overflow = 'hidden';
      
      // Move foco para o modal
      setTimeout(() => {
        contentRef.current?.focus();
      }, 100);
    } else {
      // Restaura scroll do body
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Handler para tecla Escape
  React.useEffect(() => {
    if (!closeOnEscape || preventClose) return;
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, preventClose, onClose]);
  
  return {
    isVisible,
    isMounted,
    overlayRef,
    contentRef
  };
};

// -----------------------------------------------------------------------------
// COMPONENTE MODAL PRINCIPAL
// -----------------------------------------------------------------------------
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size,
  centered,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  preventClose = false,
  className,
  overlayClassName,
  onAfterOpen,
  onAfterClose,
  ...props
}) => {
  const portalElement = usePortal();
  const { isVisible, isMounted, overlayRef, contentRef } = useModalState(
    isOpen,
    onClose,
    closeOnEscape,
    preventClose,
    onAfterOpen,
    onAfterClose
  );
  
  // Handler para clique no overlay
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (
      closeOnOverlayClick &&
      !preventClose &&
      event.target === overlayRef.current
    ) {
      onClose();
    }
  };
  
  // Handler para fechar
  const handleClose = () => {
    if (!preventClose) {
      onClose();
    }
  };
  
  // Não renderiza se não está mounted
  if (!isMounted || !portalElement) {
    return null;
  }
  
  return createPortal(
    <div className={modalVariants()}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={cn(
          overlayVariants({ visible: isVisible }),
          overlayClassName
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      
      {/* Conteúdo do Modal */}
      <div
        ref={contentRef}
        className={cn(
          contentVariants({ size, centered, visible: isVisible }),
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={props['aria-label'] || title}
        aria-labelledby={props['aria-labelledby']}
        aria-describedby={props['aria-describedby']}
        tabIndex={-1}
      >
        {/* Header padrão se título for fornecido */}
        {title && (
          <ModalHeader 
            showCloseButton={showCloseButton}
            onClose={handleClose}
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
              {description && (
                <p className="mt-1 text-sm text-gray-600">
                  {description}
                </p>
              )}
            </div>
          </ModalHeader>
        )}
        
        {/* Conteúdo */}
        {children}
      </div>
    </div>,
    portalElement
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE MODAL HEADER
// -----------------------------------------------------------------------------
const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className,
  showCloseButton = true,
  onClose
}) => (
  <div className={cn(
    'flex items-start justify-between p-6 pb-4 border-b border-gray-200',
    className
  )}>
    <div className="flex-1">
      {children}
    </div>
    
    {showCloseButton && onClose && (
      <button
        onClick={onClose}
        className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Fechar modal"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>
    )}
  </div>
);

// -----------------------------------------------------------------------------
// COMPONENTE MODAL CONTENT
// -----------------------------------------------------------------------------
const ModalContent: React.FC<ModalContentProps> = ({
  children,
  className
}) => (
  <div className={cn('p-6', className)}>
    {children}
  </div>
);

// -----------------------------------------------------------------------------
// COMPONENTE MODAL FOOTER
// -----------------------------------------------------------------------------
const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className
}) => (
  <div className={cn(
    'flex items-center justify-end gap-3 p-6 pt-4 border-t border-gray-200 bg-gray-50',
    className
  )}>
    {children}
  </div>
);

// -----------------------------------------------------------------------------
// COMPONENTES PRÉ-CONFIGURADOS
// -----------------------------------------------------------------------------

// Modal de confirmação
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'info',
  loading = false
}) => {
  const variantStyles = {
    danger: 'text-error-600',
    warning: 'text-warning-600',
    info: 'text-primary-600'
  };

  const buttonStyles = {
    danger: 'bg-error-500 hover:bg-error-600 text-white',
    warning: 'bg-warning-500 hover:bg-warning-600 text-white',
    info: 'bg-primary-500 hover:bg-primary-600 text-white'
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="sm"
      preventClose={loading}
    >
      <ModalContent>
        <div className="flex items-start gap-4">
          {/* Ícone */}
          <div className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
            variant === 'danger' && 'bg-error-100',
            variant === 'warning' && 'bg-warning-100',
            variant === 'info' && 'bg-primary-100'
          )}>
            {variant === 'danger' && (
              <svg className={cn('w-6 h-6', variantStyles[variant])} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            )}
            {variant === 'warning' && (
              <svg className={cn('w-6 h-6', variantStyles[variant])} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {variant === 'info' && (
              <svg className={cn('w-6 h-6', variantStyles[variant])} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          
          {/* Conteúdo */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600">
              {message}
            </p>
          </div>
        </div>
      </ModalContent>
      
      <ModalFooter>
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cancelText}
        </button>
        
        <button
          onClick={onConfirm}
          disabled={loading}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2',
            buttonStyles[variant]
          )}
        >
          {loading && (
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          {confirmText}
        </button>
      </ModalFooter>
    </Modal>
  );
};

// Modal de imagem/galeria
export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src,
  alt,
  title
}) => (
  <Modal 
    isOpen={isOpen} 
    onClose={onClose}
    size="4xl"
    className="bg-black"
  >
    <div className="relative">
      {/* Imagem */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto max-h-[80vh] object-contain"
      />
      
      {/* Botão fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-black/20 rounded-lg transition-colors"
        aria-label="Fechar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Título */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>
        </div>
      )}
    </div>
  </Modal>
);

// -----------------------------------------------------------------------------
// HOOK PERSONALIZADO PARA MODAL
// -----------------------------------------------------------------------------
export const useModal = (initialOpen = false) => {
  const [isOpen, setIsOpen] = React.useState(initialOpen);
  
  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen(prev => !prev), []);
  
  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen
  };
};

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------
export {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  modalVariants,
  overlayVariants,
  contentVariants
};

export default Modal;