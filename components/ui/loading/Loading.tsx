// =============================================================================
// MEUPORTALFIT - COMPONENTE LOADING
// =============================================================================

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// VARIANTES DO LOADING
// -----------------------------------------------------------------------------
const loadingVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        spinner: '',
        dots: 'space-x-1',
        pulse: '',
        bars: 'space-x-1',
        skeleton: 'animate-pulse bg-gray-200 rounded',
        shimmer: 'shimmer bg-gray-200 rounded'
      },
      
      size: {
        xs: 'text-xs',
        sm: 'text-sm', 
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl'
      },
      
      color: {
        primary: 'text-primary-500',
        secondary: 'text-secondary-500',
        white: 'text-white',
        gray: 'text-gray-500',
        current: 'text-current'
      }
    },
    
    defaultVariants: {
      variant: 'spinner',
      size: 'md',
      color: 'primary'
    }
  }
);

// -----------------------------------------------------------------------------
// INTERFACES
// -----------------------------------------------------------------------------
export interface LoadingProps extends VariantProps<typeof loadingVariants> {
  className?: string;
  label?: string;
  fullScreen?: boolean;
}

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray' | 'current';
  className?: string;
}

export interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
}

// -----------------------------------------------------------------------------
// COMPONENTE SPINNER
// -----------------------------------------------------------------------------
const Spinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    '2xl': 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    white: 'text-white',
    gray: 'text-gray-500',
    current: 'text-current'
  };

  return (
    <svg
      className={cn(
        'animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE DOTS
// -----------------------------------------------------------------------------
const LoadingDots: React.FC<Pick<LoadingProps, 'size' | 'color' | 'className'>> = ({
  size = 'md',
  color = 'primary',
  className
}) => {
  const sizeClasses = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    xl: 'w-3 h-3',
    '2xl': 'w-4 h-4'
  };

  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    white: 'bg-white',
    gray: 'bg-gray-500',
    current: 'bg-current'
  };

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            'rounded-full animate-bounce',
            sizeClasses[size!],
            colorClasses[color!]
          )}
          style={{
            animationDelay: `${index * 0.15}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE PULSE
// -----------------------------------------------------------------------------
const LoadingPulse: React.FC<Pick<LoadingProps, 'size' | 'color' | 'className'>> = ({
  size = 'md',
  color = 'primary',
  className
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    white: 'bg-white',
    gray: 'bg-gray-500',
    current: 'bg-current'
  };

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'rounded-full animate-ping opacity-75',
          sizeClasses[size!],
          colorClasses[color!]
        )}
      />
      <div
        className={cn(
          'rounded-full absolute inset-0',
          sizeClasses[size!],
          colorClasses[color!]
        )}
      />
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE BARS
// -----------------------------------------------------------------------------
const LoadingBars: React.FC<Pick<LoadingProps, 'size' | 'color' | 'className'>> = ({
  size = 'md',
  color = 'primary',
  className
}) => {
  const sizeClasses = {
    xs: 'w-0.5 h-3',
    sm: 'w-0.5 h-4',
    md: 'w-1 h-6',
    lg: 'w-1 h-8',
    xl: 'w-1.5 h-10',
    '2xl': 'w-2 h-12'
  };

  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    white: 'bg-white',
    gray: 'bg-gray-500',
    current: 'bg-current'
  };

  return (
    <div className={cn('flex items-end space-x-1', className)}>
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={cn(
            'rounded-sm animate-pulse',
            sizeClasses[size!],
            colorClasses[color!]
          )}
          style={{
            animationDelay: `${index * 0.15}s`,
            animationDuration: '1.2s'
          }}
        />
      ))}
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE SKELETON
// -----------------------------------------------------------------------------
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = '1rem',
  lines = 1,
  className,
  variant = 'rectangular'
}) => {
  const variantClasses = {
    text: 'rounded-sm',
    rectangular: 'rounded',
    circular: 'rounded-full',
    rounded: 'rounded-lg'
  };

  if (lines === 1) {
    return (
      <div
        className={cn(
          'animate-pulse bg-gray-200',
          variantClasses[variant],
          className
        )}
        style={{ width, height }}
      />
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'animate-pulse bg-gray-200',
            variantClasses[variant]
          )}
          style={{
            width: index === lines - 1 ? '75%' : width,
            height
          }}
        />
      ))}
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE LOADING PRINCIPAL
// -----------------------------------------------------------------------------
const Loading: React.FC<LoadingProps> = ({
  variant = 'spinner',
  size,
  color,
  className,
  label,
  fullScreen = false
}) => {
  const renderLoadingElement = () => {
    switch (variant) {
      case 'spinner':
        return <Spinner size={size} color={color} />;
      case 'dots':
        return <LoadingDots size={size} color={color} />;
      case 'pulse':
        return <LoadingPulse size={size} color={color} />;
      case 'bars':
        return <LoadingBars size={size} color={color} />;
      case 'skeleton':
        return <LoadingSkeleton className="w-24 h-6" />;
      case 'shimmer':
        return <div className="shimmer bg-gray-200 rounded w-24 h-6" />;
      default:
        return <Spinner size={size} color={color} />;
    }
  };

  const content = (
    <div
      className={cn(
        loadingVariants({ variant, size, color }),
        'flex-col gap-3',
        className
      )}
      role="status"
      aria-label={label || 'Carregando...'}
    >
      {renderLoadingElement()}
      
      {label && (
        <span className="text-sm font-medium text-gray-600">
          {label}
        </span>
      )}
      
      <span className="sr-only">
        {label || 'Carregando...'}
      </span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

// -----------------------------------------------------------------------------
// COMPONENTES PRÉ-CONFIGURADOS
// -----------------------------------------------------------------------------

// Loading para botões
export const ButtonLoading: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ 
  size = 'md' 
}) => {
  const sizeMap = {
    sm: 'xs' as const,
    md: 'sm' as const,
    lg: 'md' as const
  };
  
  return <Spinner size={sizeMap[size]} color="current" />;
};

// Loading para tela cheia
export const FullScreenLoading: React.FC<{ 
  label?: string;
  variant?: LoadingProps['variant'];
}> = ({ 
  label = 'Carregando...', 
  variant = 'spinner' 
}) => (
  <Loading 
    variant={variant}
    size="lg"
    label={label}
    fullScreen 
  />
);

// Loading para cards/seções
export const SectionLoading: React.FC<{
  lines?: number;
  className?: string;
}> = ({ 
  lines = 3,
  className 
}) => (
  <div className={cn('space-y-4', className)}>
    <LoadingSkeleton lines={lines} height="1.5rem" />
  </div>
);

// Loading para listas
export const ListLoading: React.FC<{
  items?: number;
  className?: string;
}> = ({ 
  items = 5,
  className 
}) => (
  <div className={cn('space-y-3', className)}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3">
        <LoadingSkeleton variant="circular" width="2.5rem" height="2.5rem" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton height="1rem" width="60%" />
          <LoadingSkeleton height="0.875rem" width="40%" />
        </div>
      </div>
    ))}
  </div>
);

// Loading para produtos
export const ProductLoading: React.FC<{
  count?: number;
  className?: string;
}> = ({ 
  count = 6,
  className 
}) => (
  <div className={cn('grid grid-cols-products gap-6', className)}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <LoadingSkeleton variant="rectangular" width="100%" height="12rem" />
        <div className="p-4 space-y-3">
          <LoadingSkeleton height="1.25rem" />
          <LoadingSkeleton height="1rem" width="80%" />
          <LoadingSkeleton height="1.5rem" width="50%" />
        </div>
      </div>
    ))}
  </div>
);

// Loading para quiz
export const QuizLoading: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('max-w-2xl mx-auto space-y-6', className)}>
    {/* Progress bar skeleton */}
    <LoadingSkeleton height="0.5rem" width="100%" variant="rounded" />
    
    {/* Question skeleton */}
    <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
      <div className="space-y-4">
        <LoadingSkeleton height="2rem" width="80%" />
        <LoadingSkeleton height="1rem" width="60%" />
      </div>
      
      {/* Options skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
            <LoadingSkeleton variant="circular" width="1.5rem" height="1.5rem" />
            <LoadingSkeleton height="1rem" width="70%" />
          </div>
        ))}
      </div>
      
      {/* Button skeleton */}
      <div className="flex justify-end">
        <LoadingSkeleton height="2.75rem" width="8rem" variant="rounded" />
      </div>
    </div>
  </div>
);

// Loading com overlay
export const OverlayLoading: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  label?: string;
}> = ({ isLoading, children, label }) => (
  <div className="relative">
    {children}
    {isLoading && (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
        <Loading variant="spinner" size="lg" label={label} />
      </div>
    )}
  </div>
);

// -----------------------------------------------------------------------------
// HOOK PARA LOADING STATES
// -----------------------------------------------------------------------------
export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = React.useState(initialState);
  
  const startLoading = React.useCallback(() => setIsLoading(true), []);
  const stopLoading = React.useCallback(() => setIsLoading(false), []);
  const toggleLoading = React.useCallback(() => setIsLoading(prev => !prev), []);
  
  const withLoading = React.useCallback(async <T>(
    asyncFn: () => Promise<T>
  ): Promise<T> => {
    try {
      startLoading();
      return await asyncFn();
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
    withLoading
  };
};

// -----------------------------------------------------------------------------
// HOOK PARA LAZY LOADING COM INTERSECTION OBSERVER
// -----------------------------------------------------------------------------
export const useLazyLoading = (
  threshold = 0.1,
  rootMargin = '50px'
) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsLoaded(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  
  return {
    elementRef,
    isVisible,
    isLoaded
  };
};

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------
export {
  Loading,
  Spinner,
  LoadingDots,
  LoadingPulse,
  LoadingBars,
  LoadingSkeleton,
  loadingVariants
};

export default Loading;