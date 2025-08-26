// =============================================================================
// MEUPORTALFIT - COMPONENTE CARD BASE
// =============================================================================

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// VARIANTES DO CARD
// -----------------------------------------------------------------------------
const cardVariants = cva(
  // Base styles - sempre aplicados
  [
    'rounded-card bg-white transition-all duration-200',
    'overflow-hidden' // Garante que conteúdo não vaze do border-radius
  ],
  {
    variants: {
      variant: {
        // Variante padrão - shadow suave
        default: [
          'shadow-card border border-gray-100'
        ],
        
        // Variante outlined - apenas borda
        outlined: [
          'border-2 border-gray-200 shadow-none',
          'hover:border-gray-300'
        ],
        
        // Variante elevated - shadow mais pronunciada
        elevated: [
          'shadow-lg border-0',
          'hover:shadow-xl'
        ],
        
        // Variante filled - fundo colorido
        filled: [
          'bg-gray-50 border border-gray-200 shadow-sm'
        ],
        
        // Variante ghost - quase invisível
        ghost: [
          'bg-transparent border-0 shadow-none'
        ],
        
        // Variante de gradiente
        gradient: [
          'bg-gradient-hero border-0 shadow-card'
        ]
      },
      
      padding: {
        none: 'p-0',
        xs: 'p-2',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8'
      },
      
      hover: {
        true: [
          'hover:shadow-lg hover:-translate-y-1',
          'cursor-pointer'
        ],
        false: ''
      },
      
      clickable: {
        true: [
          'cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'active:scale-[0.99] transform'
        ],
        false: ''
      }
    },
    
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: false,
      clickable: false
    }
  }
);

// -----------------------------------------------------------------------------
// INTERFACES
// -----------------------------------------------------------------------------
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  
  // Permite usar como botão
  asChild?: boolean;
  
  // Classes extras
  className?: string;
  
  // Callback para cliques
  onClick?: () => void;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// -----------------------------------------------------------------------------
// COMPONENTE CARD PRINCIPAL
// -----------------------------------------------------------------------------
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      hover,
      clickable,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    // Se tem onClick, automaticamente torna clickable
    const isClickable = clickable || !!onClick;
    
    // Determina se deve ter hover effect
    const shouldHover = hover || isClickable;
    
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ 
            variant, 
            padding, 
            hover: shouldHover, 
            clickable: isClickable 
          }),
          className
        )}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={isClickable ? (e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onClick) {
            e.preventDefault();
            onClick();
          }
        } : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// -----------------------------------------------------------------------------
// COMPONENTE CARD HEADER
// -----------------------------------------------------------------------------
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5 p-6 pb-4',
        className
      )}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

// -----------------------------------------------------------------------------
// COMPONENTE CARD TITLE
// -----------------------------------------------------------------------------
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = 'h3', ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        'text-xl font-semibold leading-none tracking-tight text-gray-900',
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

// -----------------------------------------------------------------------------
// COMPONENTE CARD DESCRIPTION
// -----------------------------------------------------------------------------
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'text-sm text-gray-600 leading-relaxed',
        className
      )}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

// -----------------------------------------------------------------------------
// COMPONENTE CARD CONTENT
// -----------------------------------------------------------------------------
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn('p-6 pt-0', className)} 
      {...props} 
    />
  )
);

CardContent.displayName = 'CardContent';

// -----------------------------------------------------------------------------
// COMPONENTE CARD FOOTER
// -----------------------------------------------------------------------------
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center p-6 pt-4 border-t border-gray-100',
        className
      )}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

// -----------------------------------------------------------------------------
// COMPONENTES PRÉ-CONFIGURADOS ESPECÍFICOS
// -----------------------------------------------------------------------------

// Card para produtos
export interface ProductCardProps extends CardProps {
  image?: string;
  title: string;
  price?: number;
  rating?: number;
  badge?: string;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  rating,
  badge,
  onAddToCart,
  onClick,
  className,
  ...props
}) => (
  <Card
    variant="elevated"
    hover
    clickable={!!onClick}
    onClick={onClick}
    className={cn('max-w-sm', className)}
    {...props}
  >
    {/* Imagem */}
    {image && (
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {badge && (
          <span className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
    )}
    
    <CardContent>
      <CardTitle className="line-clamp-2 mb-2">
        {title}
      </CardTitle>
      
      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                'w-4 h-4',
                i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-600 ml-1">
            {rating.toFixed(1)}
          </span>
        </div>
      )}
      
      {/* Preço */}
      {price && (
        <div className="text-lg font-bold text-primary-600 mb-3">
          ${price.toFixed(2)}
        </div>
      )}
      
      {/* Botão de ação */}
      {onAddToCart && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors"
        >
          Ver Produto
        </button>
      )}
    </CardContent>
  </Card>
);

// Card para estatísticas/métricas
export interface StatCardProps extends CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'primary',
  className,
  ...props
}) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50',
    secondary: 'text-secondary-600 bg-secondary-50',
    success: 'text-success-600 bg-success-50',
    warning: 'text-warning-600 bg-warning-50',
    error: 'text-error-600 bg-error-50'
  };

  const trendColors = {
    up: 'text-success-600',
    down: 'text-error-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card
      variant="outlined"
      className={cn('p-6', className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {value}
          </p>
          
          {trend && trendValue && (
            <div className={cn(
              'flex items-center gap-1 mt-1 text-sm',
              trendColors[trend]
            )}>
              {trend === 'up' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              )}
              {trend === 'down' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                </svg>
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={cn(
            'p-3 rounded-lg',
            colorClasses[color]
          )}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

// Card para testimonials
export interface TestimonialCardProps extends CardProps {
  content: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  rating?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  content,
  author,
  rating,
  className,
  ...props
}) => (
  <Card
    variant="elevated"
    className={cn('max-w-md', className)}
    {...props}
  >
    <CardContent className="pt-6">
      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                'w-4 h-4',
                i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}
      
      {/* Conteúdo */}
      <blockquote className="text-gray-700 mb-4 italic">
        "{content}"
      </blockquote>
      
      {/* Autor */}
      <div className="flex items-center gap-3">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-600 font-semibold text-sm">
              {author.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
        
        <div>
          <div className="font-semibold text-gray-900">
            {author.name}
          </div>
          {author.role && (
            <div className="text-sm text-gray-600">
              {author.role}
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

// -----------------------------------------------------------------------------
// HOOK PERSONALIZADO PARA CARD INTERACTIONS
// -----------------------------------------------------------------------------
export const useCardHover = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const cardProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  };
  
  return {
    isHovered,
    cardProps
  };
};

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants
};

export default Card;