// =============================================================================
// MEUPORTALFIT - COMPONENTE PROGRESS BAR
// =============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { QuizStep } from '@/types/quiz';

// -----------------------------------------------------------------------------
// INTERFACES
// -----------------------------------------------------------------------------
export interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
  showPercentage?: boolean;
  showStepNumbers?: boolean;
  variant?: 'default' | 'minimal' | 'detailed';
  className?: string;
  
  // Para versão detalhada
  steps?: QuizStep[];
  currentStepIndex?: number;
}

// -----------------------------------------------------------------------------
// COMPONENTE PROGRESS BAR PRINCIPAL
// -----------------------------------------------------------------------------
const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  percentage,
  showPercentage = true,
  showStepNumbers = true,
  variant = 'default',
  className,
  steps,
  currentStepIndex = 0
}) => {
  // Renderização baseada na variante
  switch (variant) {
    case 'minimal':
      return <MinimalProgressBar {...{ current, total, percentage, className }} />;
    
    case 'detailed':
      return (
        <DetailedProgressBar 
          {...{ current, total, percentage, className, steps, currentStepIndex }}
        />
      );
    
    default:
      return (
        <DefaultProgressBar 
          {...{ current, total, percentage, showPercentage, showStepNumbers, className }}
        />
      );
  }
};

// -----------------------------------------------------------------------------
// VARIANTE DEFAULT
// -----------------------------------------------------------------------------
const DefaultProgressBar: React.FC<{
  current: number;
  total: number;
  percentage: number;
  showPercentage: boolean;
  showStepNumbers: boolean;
  className?: string;
}> = ({
  current,
  total,
  percentage,
  showPercentage,
  showStepNumbers,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {/* Header com números/percentagem */}
      <div className="flex items-center justify-between">
        {showStepNumbers && (
          <span className="text-sm font-medium text-gray-700">
            Etapa {current} de {total}
          </span>
        )}
        
        {showPercentage && (
          <span className="text-sm font-medium text-primary-600">
            {percentage}% completo
          </span>
        )}
      </div>

      {/* Barra de progresso */}
      <div className="relative">
        <div className="overflow-hidden h-3 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        {/* Indicador de posição atual */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary-600 rounded-full border-2 border-white shadow-md"
          initial={{ left: '0%' }}
          animate={{ left: `${Math.max(percentage - 2, 0)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// VARIANTE MINIMAL
// -----------------------------------------------------------------------------
const MinimalProgressBar: React.FC<{
  current: number;
  total: number;
  percentage: number;
  className?: string;
}> = ({ percentage, className }) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="overflow-hidden h-1 bg-gray-200 rounded-full">
        <motion.div
          className="h-full bg-primary-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// VARIANTE DETAILED
// -----------------------------------------------------------------------------
const DetailedProgressBar: React.FC<{
  current: number;
  total: number;
  percentage: number;
  className?: string;
  steps?: QuizStep[];
  currentStepIndex: number;
}> = ({
  current,
  total,
  percentage,
  className,
  steps = [],
  currentStepIndex
}) => {
  if (!steps.length) {
    return <DefaultProgressBar {...{ current, total, percentage, showPercentage: true, showStepNumbers: true, className }} />;
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {steps[currentStepIndex]?.title || `Etapa ${current}`}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {percentage}% completo • {current} de {total} etapas
        </p>
      </div>

      {/* Barra principal */}
      <div className="relative">
        <div className="overflow-hidden h-2 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="relative">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <StepIndicator
              key={step.id}
              step={step}
              index={index}
              currentIndex={currentStepIndex}
              isCompleted={index < currentStepIndex}
              isCurrent={index === currentStepIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE STEP INDICATOR
// -----------------------------------------------------------------------------
interface StepIndicatorProps {
  step: QuizStep;
  index: number;
  currentIndex: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  step,
  index,
  currentIndex,
  isCompleted,
  isCurrent
}) => {
  // Determina o status visual
  const getStatusClasses = () => {
    if (isCompleted) {
      return {
        dot: 'bg-primary-600 border-primary-600',
        text: 'text-primary-600',
        icon: 'text-white'
      };
    }
    
    if (isCurrent) {
      return {
        dot: 'bg-primary-100 border-primary-600 ring-2 ring-primary-600 ring-offset-2',
        text: 'text-primary-600 font-medium',
        icon: 'text-primary-600'
      };
    }
    
    return {
      dot: 'bg-gray-100 border-gray-300',
      text: 'text-gray-400',
      icon: 'text-gray-400'
    };
  };

  const statusClasses = getStatusClasses();

  // Ícone baseado no tipo de step
  const getStepIcon = () => {
    const iconMap = {
      'WELCOME': '👋',
      'DEMOGRAPHIC': '👤', 
      'GOALS': '🎯',
      'LIFESTYLE': '⚡',
      'HEALTH': '❤️',
      'PREFERENCES': '⚙️',
      'BUDGET': '💰',
      'SUMMARY': '✅'
    };
    
    return iconMap[step.type] || (index + 1).toString();
  };

  return (
    <div className="flex flex-col items-center space-y-2 relative">
      {/* Dot/Circle */}
      <motion.div
        className={cn(
          'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300',
          statusClasses.dot
        )}
        whileHover={{ scale: isCurrent ? 1.1 : 1.05 }}
      >
        {isCompleted ? (
          <svg className={cn('w-5 h-5', statusClasses.icon)} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <span className={cn('text-sm font-medium', statusClasses.icon)}>
            {getStepIcon()}
          </span>
        )}
      </motion.div>

      {/* Label */}
      <div className="text-center max-w-20">
        <p className={cn('text-xs leading-tight', statusClasses.text)}>
          {step.title.split(' ').slice(0, 2).join(' ')}
        </p>
      </div>

      {/* Linha conectora (exceto no último) */}
      {index < currentIndex && (
        <div className="absolute top-5 left-10 h-0.5 bg-primary-600" 
             style={{ width: 'calc(100vw / var(--total-steps) - 2.5rem)' }} />
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE DE PROGRESSO CIRCULAR
// -----------------------------------------------------------------------------
export const CircularProgress: React.FC<{
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}> = ({
  percentage,
  size = 'md',
  showText = true,
  className
}) => {
  const sizeConfig = {
    sm: { width: 60, strokeWidth: 6, textSize: 'text-xs' },
    md: { width: 80, strokeWidth: 8, textSize: 'text-sm' },
    lg: { width: 120, strokeWidth: 10, textSize: 'text-base' }
  };

  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={config.width}
        height={config.width}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={config.strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          stroke="#22c55e"
          strokeWidth={config.strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-semibold text-gray-700', config.textSize)}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// HOOK PARA ANIMAÇÃO DE PROGRESSO
// -----------------------------------------------------------------------------
export const useProgressAnimation = (targetPercentage: number) => {
  const [currentPercentage, setCurrentPercentage] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPercentage(targetPercentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [targetPercentage]);

  return currentPercentage;
};

// -----------------------------------------------------------------------------
// COMPONENTE MINI PROGRESS (para usar em cards, etc.)
// -----------------------------------------------------------------------------
export const MiniProgress: React.FC<{
  percentage: number;
  height?: number;
  className?: string;
}> = ({
  percentage,
  height = 4,
  className
}) => {
  return (
    <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', className)}>
      <motion.div
        className="bg-primary-500 rounded-full"
        style={{ height }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;