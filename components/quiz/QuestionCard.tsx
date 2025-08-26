// =============================================================================
// MEUPORTALFIT - COMPONENTE QUESTION CARD
// =============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import type { QuizQuestion, QuestionOption } from '@/types/quiz';

// -----------------------------------------------------------------------------
// INTERFACES
// -----------------------------------------------------------------------------
export interface QuestionCardProps {
  question: QuizQuestion;
  value?: any;
  selectedOptions?: string[];
  onChange: (value: any, selectedOptions?: string[]) => void;
  disabled?: boolean;
  className?: string;
}

interface OptionProps {
  option: QuestionOption;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
  multiSelect?: boolean;
}

// -----------------------------------------------------------------------------
// COMPONENTE OPTION
// -----------------------------------------------------------------------------
const OptionCard: React.FC<OptionProps> = ({
  option,
  isSelected,
  onSelect,
  disabled = false,
  multiSelect = false
}) => {
  return (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={cn(
        'relative cursor-pointer transition-all duration-200',
        disabled && 'cursor-not-allowed opacity-50'
      )}
      onClick={disabled ? undefined : () => onSelect(option.id)}
    >
      <Card
        className={cn(
          'p-4 border-2 transition-all duration-200',
          isSelected 
            ? 'border-primary-500 bg-primary-50 shadow-lg' 
            : 'border-gray-200 hover:border-gray-300 hover:shadow-md',
          disabled && 'hover:border-gray-200 hover:shadow-none'
        )}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox/Radio */}
          <div className="flex-shrink-0 mt-1">
            {multiSelect ? (
              <div className={cn(
                'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                isSelected 
                  ? 'border-primary-500 bg-primary-500' 
                  : 'border-gray-300'
              )}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ) : (
              <div className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                isSelected 
                  ? 'border-primary-500 bg-primary-500' 
                  : 'border-gray-300'
              )}>
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            )}
          </div>

          {/* Conteúdo da Opção */}
          <div className="flex-1 min-w-0">
            {/* Ícone da opção (se houver) */}
            {option.icon && (
              <div className="text-2xl mb-2">
                {option.icon}
              </div>
            )}

            {/* Imagem da opção (se houver) */}
            {option.image_url && (
              <div className="mb-3">
                <img
                  src={option.image_url}
                  alt={option.text}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Texto principal */}
            <h4 className={cn(
              'font-medium text-gray-900 mb-1',
              isSelected && 'text-primary-700'
            )}>
              {option.text}
            </h4>

            {/* Descrição (se houver) */}
            {option.description && (
              <p className="text-sm text-gray-600">
                {option.description}
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE RANGE SLIDER
// -----------------------------------------------------------------------------
const RangeSlider: React.FC<{
  question: QuizQuestion;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}> = ({ question, value, onChange, disabled }) => {
  const config = question.config;
  const min = config.min || 0;
  const max = config.max || 10;
  const step = config.step || 1;
  const unit = config.unit || '';
  const labels = config.labels || {};
  const showValue = config.show_value !== false;

  return (
    <div className="space-y-4">
      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value || min}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={cn(
            'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
            'slider-thumb:appearance-none slider-thumb:w-6 slider-thumb:h-6',
            'slider-thumb:rounded-full slider-thumb:bg-primary-500',
            'slider-thumb:cursor-pointer slider-thumb:shadow-lg',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        />
      </div>

      {/* Labels dos extremos */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>{labels[min] || `${min}${unit}`}</span>
        {showValue && (
          <span className="font-medium text-primary-600">
            {value || min}{unit}
          </span>
        )}
        <span>{labels[max] || `${max}${unit}`}</span>
      </div>

      {/* Labels intermediários (se houver) */}
      {Object.keys(labels).length > 2 && (
        <div className="flex justify-center space-x-8 text-xs text-gray-400">
          {Object.entries(labels).slice(1, -1).map(([key, label]) => (
            <span key={key}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE RATING SCALE
// -----------------------------------------------------------------------------
const RatingScale: React.FC<{
  question: QuizQuestion;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}> = ({ question, value, onChange, disabled }) => {
  const config = question.config;
  const min = config.scale_min || 1;
  const max = config.scale_max || 5;
  const labels = config.scale_labels || [];
  const icons = config.scale_icons || [];

  const ratings = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="space-y-4">
      {/* Rating Buttons */}
      <div className="flex justify-center space-x-2">
        {ratings.map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(rating)}
            disabled={disabled}
            className={cn(
              'w-12 h-12 rounded-full border-2 transition-all duration-200',
              'flex items-center justify-center text-lg font-medium',
              value === rating
                ? 'border-primary-500 bg-primary-500 text-white'
                : 'border-gray-300 text-gray-600 hover:border-primary-300',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {icons[rating - min] || rating}
          </button>
        ))}
      </div>

      {/* Labels */}
      {labels.length > 0 && (
        <div className="flex justify-between text-sm text-gray-500">
          <span>{labels[0]}</span>
          {labels[labels.length - 1] && (
            <span>{labels[labels.length - 1]}</span>
          )}
        </div>
      )}

      {/* Valor selecionado */}
      {value && (
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Selecionado: <span className="font-medium text-primary-600">{value}</span>
          </span>
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE IMAGE SELECTION
// -----------------------------------------------------------------------------
const ImageSelection: React.FC<{
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}> = ({ question, value, onChange, disabled }) => {
  const config = question.config;
  const images = config.images || [];
  const gridColumns = config.grid_columns || 2;

  return (
    <div 
      className={cn(
        'grid gap-4',
        gridColumns === 2 && 'grid-cols-2',
        gridColumns === 3 && 'grid-cols-3',
        gridColumns === 4 && 'grid-cols-4'
      )}
    >
      {images.map((imageOption) => (
        <motion.div
          key={imageOption.id}
          whileHover={disabled ? {} : { scale: 1.05 }}
          whileTap={disabled ? {} : { scale: 0.95 }}
          className={cn(
            'relative cursor-pointer transition-all duration-200',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          onClick={disabled ? undefined : () => onChange(imageOption.value as string)}
        >
          <div className={cn(
            'relative rounded-lg overflow-hidden border-2 transition-all',
            value === imageOption.value
              ? 'border-primary-500 shadow-lg'
              : 'border-gray-200 hover:border-gray-300'
          )}>
            <img
              src={imageOption.image_url}
              alt={imageOption.image_alt || imageOption.text}
              className="w-full h-32 object-cover"
            />
            
            {/* Overlay quando selecionado */}
            {value === imageOption.value && (
              <div className="absolute inset-0 bg-primary-500 bg-opacity-20 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Texto da opção */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
              <p className="text-sm font-medium text-center">
                {imageOption.text}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE BUDGET RANGE
// -----------------------------------------------------------------------------
const BudgetRange: React.FC<{
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}> = ({ question, value, onChange, disabled }) => {
  const config = question.config;
  const budgetOptions = config.budget_options || [];
  const currency = config.currency || 'USD';

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {budgetOptions.map((option) => (
        <motion.div
          key={option.id}
          whileHover={disabled ? {} : { scale: 1.02 }}
          whileTap={disabled ? {} : { scale: 0.98 }}
          className={cn(
            'relative cursor-pointer transition-all duration-200',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          onClick={disabled ? undefined : () => onChange(option.value as string)}
        >
          <Card
            className={cn(
              'p-4 border-2 transition-all duration-200 text-center',
              value === option.value
                ? 'border-primary-500 bg-primary-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            )}
          >
            {/* Badges */}
            <div className="flex justify-center gap-1 mb-2">
              {option.popular && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              {option.recommended && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Recomendado
                </span>
              )}
            </div>

            {/* Valor */}
            <div className={cn(
              'font-bold text-lg mb-1',
              value === option.value ? 'text-primary-700' : 'text-gray-900'
            )}>
              {option.text}
            </div>

            {/* Descrição do range */}
            <div className="text-sm text-gray-600">
              {option.min_value === 0 ? 'Até' : 'De'} ${option.min_value}
              {option.max_value && option.max_value !== option.min_value && 
                ` a $${option.max_value}`
              } {option.max_value === 2000 && '+'}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL QUESTION CARD
// -----------------------------------------------------------------------------
const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  selectedOptions = [],
  onChange,
  disabled = false,
  className
}) => {
  // Handler para single choice
  const handleSingleChoice = (optionId: string) => {
    const option = question.config.options?.find(opt => opt.id === optionId);
    if (option) {
      onChange(option.value, [optionId]);
    }
  };

  // Handler para multiple choice
  const handleMultipleChoice = (optionId: string) => {
    const option = question.config.options?.find(opt => opt.id === optionId);
    if (!option) return;

    const isSelected = selectedOptions.includes(optionId);
    const maxSelections = question.config.max_selections || Infinity;
    
    let newSelectedOptions: string[];
    
    if (isSelected) {
      // Remove seleção
      newSelectedOptions = selectedOptions.filter(id => id !== optionId);
    } else {
      // Adiciona seleção (respeitando limite)
      if (selectedOptions.length >= maxSelections) {
        // Se atingiu limite, substitui o primeiro
        newSelectedOptions = [...selectedOptions.slice(1), optionId];
      } else {
        newSelectedOptions = [...selectedOptions, optionId];
      }
    }
    
    // Coleta todos os valores selecionados
    const selectedValues = newSelectedOptions.map(id => 
      question.config.options?.find(opt => opt.id === id)?.value
    ).filter(Boolean);
    
    onChange(selectedValues, newSelectedOptions);
  };

  // Handler para boolean toggle
  const handleBooleanToggle = () => {
    onChange(!value);
  };

  // Handler para inputs de texto
  const handleTextChange = (inputValue: string) => {
    onChange(inputValue);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Cabeçalho da Pergunta */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {question.text}
          {question.required && (
            <span className="text-error-500 ml-1">*</span>
          )}
        </h3>
        
        {question.subtitle && (
          <p className="text-gray-600">
            {question.subtitle}
          </p>
        )}
        
        {question.help_text && (
          <p className="text-sm text-gray-500">
            {question.help_text}
          </p>
        )}
      </div>

      {/* Renderização baseada no tipo */}
      <div className="space-y-3">
        {/* Single Choice */}
        {question.type === 'SINGLE_CHOICE' && question.config.options && (
          <div className="grid gap-3">
            {question.config.options.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={selectedOptions.includes(option.id)}
                onSelect={handleSingleChoice}
                disabled={disabled}
                multiSelect={false}
              />
            ))}
          </div>
        )}

        {/* Multiple Choice */}
        {question.type === 'MULTIPLE_CHOICE' && question.config.options && (
          <div className="space-y-3">
            {/* Indicador de seleções */}
            {question.config.max_selections && (
              <div className="text-sm text-gray-500 text-center">
                {selectedOptions.length} de {question.config.max_selections} selecionados
                {question.config.max_selections > 1 && selectedOptions.length === question.config.max_selections && (
                  <span className="text-warning-600 ml-1">(máximo atingido)</span>
                )}
              </div>
            )}
            
            <div className="grid gap-3">
              {question.config.options.map((option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  isSelected={selectedOptions.includes(option.id)}
                  onSelect={handleMultipleChoice}
                  disabled={disabled}
                  multiSelect={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Range Slider */}
        {question.type === 'RANGE_SLIDER' && (
          <RangeSlider
            question={question}
            value={value || question.config.min || 0}
            onChange={onChange}
            disabled={disabled}
          />
        )}

        {/* Rating Scale */}
        {question.type === 'RATING_SCALE' && (
          <RatingScale
            question={question}
            value={value || 0}
            onChange={onChange}
            disabled={disabled}
          />
        )}

        {/* Boolean Toggle */}
        {question.type === 'BOOLEAN_TOGGLE' && (
          <div className="flex justify-center">
            <button
              onClick={handleBooleanToggle}
              disabled={disabled}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                value ? 'bg-primary-500' : 'bg-gray-200',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  value ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </div>
        )}

        {/* Text Input */}
        {(question.type === 'TEXT_INPUT' || question.type === 'EMAIL_INPUT') && (
          <Input
            type={question.type === 'EMAIL_INPUT' ? 'email' : 'text'}
            value={value || ''}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={question.config.placeholder}
            disabled={disabled}
            className="max-w-md mx-auto"
          />
        )}

        {/* Image Selection */}
        {question.type === 'IMAGE_SELECTION' && (
          <ImageSelection
            question={question}
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
          />
        )}

        {/* Budget Range */}
        {question.type === 'BUDGET_RANGE' && (
          <BudgetRange
            question={question}
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
          />
        )}
      </div>

      {/* Validação e Feedback */}
      {question.required && !value && !selectedOptions.length && (
        <div className="text-sm text-gray-400 text-center">
          Esta pergunta é obrigatória
        </div>
      )}
    </div>
  );
};

export default QuestionCard;