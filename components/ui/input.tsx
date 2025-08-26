// =============================================================================
// MEUPORTALFIT - COMPONENTE INPUT BASE
// =============================================================================

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// VARIANTES DO INPUT
// -----------------------------------------------------------------------------
const inputVariants = cva(
  // Base styles
  [
    'flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2',
    'text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-gray-500',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
    'transition-all duration-200'
  ],
  {
    variants: {
      size: {
        sm: 'h-9 px-2.5 text-sm',
        md: 'h-11 px-3 text-base',
        lg: 'h-13 px-4 text-lg'
      },
      
      variant: {
        default: [
          'border-gray-300 bg-white',
          'hover:border-gray-400',
          'focus:border-primary-500'
        ],
        filled: [
          'border-transparent bg-gray-100',
          'hover:bg-gray-200',
          'focus:bg-white focus:border-primary-500'
        ],
        outlined: [
          'border-2 border-gray-300 bg-transparent',
          'hover:border-gray-400',
          'focus:border-primary-500'
        ]
      },
      
      state: {
        default: '',
        error: [
          'border-error-500 bg-error-50',
          'focus:border-error-500 focus:ring-error-500'
        ],
        success: [
          'border-success-500 bg-success-50',
          'focus:border-success-500 focus:ring-success-500'
        ],
        warning: [
          'border-warning-500 bg-warning-50',
          'focus:border-warning-500 focus:ring-warning-500'
        ]
      }
    },
    
    defaultVariants: {
      size: 'md',
      variant: 'default',
      state: 'default'
    }
  }
);

const labelVariants = cva(
  'block text-sm font-medium leading-6 text-gray-900 mb-2',
  {
    variants: {
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-error-500",
        false: ''
      },
      state: {
        default: 'text-gray-900',
        error: 'text-error-700',
        success: 'text-success-700',
        warning: 'text-warning-700'
      }
    },
    defaultVariants: {
      required: false,
      state: 'default'
    }
  }
);

// -----------------------------------------------------------------------------
// INTERFACES
// -----------------------------------------------------------------------------
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  
  // Label e descrição
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  
  // Ícones
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  // Wrapper props
  wrapperClassName?: string;
  labelClassName?: string;
  
  // Estado calculado automaticamente baseado em error/success
  // state?: 'default' | 'error' | 'success' | 'warning'
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof inputVariants>, 'size'> {
  
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  
  // Controle de altura
  rows?: number;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
  
  wrapperClassName?: string;
  labelClassName?: string;
}

// -----------------------------------------------------------------------------
// COMPONENTE INPUT PRINCIPAL
// -----------------------------------------------------------------------------
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size,
      variant,
      state,
      label,
      description,
      error,
      success,
      leftIcon,
      rightIcon,
      wrapperClassName,
      labelClassName,
      required,
      ...props
    },
    ref
  ) => {
    // Determina o estado baseado em error/success
    const computedState = error ? 'error' : success ? 'success' : state || 'default';
    
    // ID único para acessibilidade
    const id = props.id || React.useId();
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const successId = success ? `${id}-success` : undefined;
    
    return (
      <div className={cn('space-y-2', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={id}
            className={cn(
              labelVariants({ required, state: computedState }),
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          {/* Input */}
          <input
            id={id}
            type={type}
            ref={ref}
            className={cn(
              inputVariants({ size, variant, state: computedState }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-describedby={cn(
              descriptionId,
              errorId,
              successId
            ).trim() || undefined}
            aria-invalid={error ? 'true' : undefined}
            {...props}
          />
          
          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        
        {/* Description */}
        {description && (
          <p
            id={descriptionId}
            className="text-sm text-gray-600"
          >
            {description}
          </p>
        )}
        
        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            className="text-sm text-error-600 flex items-center gap-1"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        
        {/* Success Message */}
        {success && (
          <p
            id={successId}
            className="text-sm text-success-600 flex items-center gap-1"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {success}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// -----------------------------------------------------------------------------
// COMPONENTE TEXTAREA
// -----------------------------------------------------------------------------
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      state,
      label,
      description,
      error,
      success,
      rows = 4,
      minRows = 2,
      maxRows = 10,
      autoResize = false,
      wrapperClassName,
      labelClassName,
      required,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const computedState = error ? 'error' : success ? 'success' : state || 'default';
    
    // Auto-resize functionality
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        
        const scrollHeight = textarea.scrollHeight;
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
        const maxHeight = lineHeight * maxRows;
        const minHeight = lineHeight * minRows;
        
        textarea.style.height = `${Math.max(minHeight, Math.min(scrollHeight, maxHeight))}px`;
      }
      
      props.onInput?.(e);
    };
    
    // Merge refs
    const mergedRef = React.useCallback((node: HTMLTextAreaElement) => {
      textareaRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);
    
    const id = props.id || React.useId();
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const successId = success ? `${id}-success` : undefined;
    
    return (
      <div className={cn('space-y-2', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={id}
            className={cn(
              labelVariants({ required, state: computedState }),
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        {/* Textarea */}
        <textarea
          id={id}
          ref={mergedRef}
          rows={autoResize ? minRows : rows}
          className={cn(
            inputVariants({ variant, state: computedState }),
            'min-h-[80px] resize-none',
            !autoResize && 'resize-y',
            className
          )}
          aria-describedby={cn(
            descriptionId,
            errorId,
            successId
          ).trim() || undefined}
          aria-invalid={error ? 'true' : undefined}
          onInput={handleInput}
          {...props}
        />
        
        {/* Description */}
        {description && (
          <p
            id={descriptionId}
            className="text-sm text-gray-600"
          >
            {description}
          </p>
        )}
        
        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            className="text-sm text-error-600 flex items-center gap-1"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        
        {/* Success Message */}
        {success && (
          <p
            id={successId}
            className="text-sm text-success-600 flex items-center gap-1"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {success}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// -----------------------------------------------------------------------------
// COMPONENTES PRÉ-CONFIGURADOS
// -----------------------------------------------------------------------------

// Input para email
export const EmailInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input
    type="email"
    leftIcon={
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    }
    {...props}
  />
);

// Input para senha
export const PasswordInput: React.FC<Omit<InputProps, 'type'>> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  
  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      leftIcon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      }
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m6.121-6.121A9.97 9.97 0 0121 12c0 .867-.157 1.696-.44 2.463m-.44-2.463L3 3" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      }
      {...props}
    />
  );
};

// Input para busca
export const SearchInput: React.FC<Omit<InputProps, 'type'> & { onClear?: () => void }> = ({ 
  onClear, 
  value,
  ...props 
}) => (
  <Input
    type="search"
    leftIcon={
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    }
    rightIcon={
      value && onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ) : undefined
    }
    value={value}
    {...props}
  />
);

// Input para números
export const NumberInput: React.FC<Omit<InputProps, 'type'> & { 
  min?: number;
  max?: number;
  step?: number;
}> = (props) => (
  <Input
    type="number"
    {...props}
  />
);

// Input para telefone
export const PhoneInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input
    type="tel"
    leftIcon={
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    }
    {...props}
  />
);

// Input para URLs
export const UrlInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input
    type="url"
    leftIcon={
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    }
    {...props}
  />
);

// -----------------------------------------------------------------------------
// HOOK PARA VALIDAÇÃO DE INPUT
// -----------------------------------------------------------------------------
export const useInputValidation = (
  value: string,
  rules: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  }
) => {
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);
  
  const validate = React.useCallback((val: string = value) => {
    if (rules.required && !val.trim()) {
      return 'Este campo é obrigatório';
    }
    
    if (rules.minLength && val.length < rules.minLength) {
      return `Mínimo de ${rules.minLength} caracteres`;
    }
    
    if (rules.maxLength && val.length > rules.maxLength) {
      return `Máximo de ${rules.maxLength} caracteres`;
    }
    
    if (rules.pattern && !rules.pattern.test(val)) {
      return 'Formato inválido';
    }
    
    if (rules.custom) {
      return rules.custom(val);
    }
    
    return null;
  }, [value, rules]);
  
  React.useEffect(() => {
    if (touched) {
      const validationError = validate();
      setError(validationError);
    }
  }, [value, touched, validate]);
  
  const onBlur = () => {
    setTouched(true);
    const validationError = validate();
    setError(validationError);
  };
  
  const reset = () => {
    setError(null);
    setTouched(false);
  };
  
  return {
    error,
    touched,
    isValid: !error,
    onBlur,
    reset,
    validate
  };
};

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------
export {
  Input,
  Textarea,
  inputVariants,
  labelVariants
};

export default Input;