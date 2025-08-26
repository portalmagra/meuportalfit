// =============================================================================
// MEUPORTALFIT - UTILITÁRIOS GERAIS
// =============================================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { UUID, BudgetRange, LifestyleType, GoalType } from '@/types';

// -----------------------------------------------------------------------------
// UTILITÁRIOS DE CSS E STYLING
// -----------------------------------------------------------------------------

/**
 * Combina classes CSS usando clsx e tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gera classes de gradiente baseadas em uma cor
 */
export function generateGradientClasses(color: string): string {
  const gradients: Record<string, string> = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
    success: 'bg-gradient-to-r from-success-500 to-success-600',
    warning: 'bg-gradient-to-r from-warning-500 to-warning-600',
    error: 'bg-gradient-to-r from-error-500 to-error-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
  };

  return gradients[color] || 'bg-gradient-to-r from-gray-500 to-gray-600';
}

/**
 * Gera cores aleatórias para avatars/placeholders
 */
export function generateColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

// -----------------------------------------------------------------------------
// UTILITÁRIOS DE STRING E TEXTO
// -----------------------------------------------------------------------------

/**
 * Capitaliza primeira letra de cada palavra
 */
export function capitalize(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Converte string para slug (URL-friendly)
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/[\s_-]+/g, '-') // Substitui espaços por hífens
    .replace(/^-+|-+$/g, ''); // Remove hífens das pontas
}

/**
 * Trunca texto com reticências
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Remove acentos de texto
 */
export function removeAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Extrai iniciais de um nome
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Converte texto para camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

/**
 * Converte camelCase para snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

// -----------------------------------------------------------------------------
// UTILITÁRIOS DE NÚMEROS E FORMATAÇÃO
// -----------------------------------------------------------------------------

/**
 * Formata valor monetário em USD
 */
export function formatCurrency(
  amount: number, 
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formata valor monetário em BRL (para comparações)
 */
export function formatBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

/**
 * Formata número com separadores de milhares
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Formata porcentagem
 */
export function formatPercentage(num: number, decimals: number = 1): string {
  return `${num.toFixed(decimals)}%`;
}

/**
 * Converte USD para BRL (taxa aproximada)
 */
export function convertUSDToBRL(usd: number, exchangeRate: number = 5.2): number {
  return usd * exchangeRate;
}

/**
 * Gera range de números
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Calcula média de array de números
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

/**
 * Arredonda número para N casas decimais
 */
export function roundTo(num: number, decimals: number): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// -----------------------------------------------------------------------------
// UTILITÁRIOS DE DATA E TEMPO
// -----------------------------------------------------------------------------

/**
 * Formata data em português brasileiro
 */
export function formatDate(
  date: Date | string,
  format: 'short' | 'long' | 'relative' = 'short'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'relative') {
    return formatRelativeTime(dateObj);
  }
  
  const options: Intl.DateTimeFormatOptions = format === 'long' 
    ? { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      }
    : { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      };
  
  return new Intl.DateTimeFormat('pt-BR', options).format(dateObj);
}

/**
 * Formata tempo relativo (ex: "há 2 horas")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  
  if (diffMs < minute) return 'agora mesmo';
  if (diffMs < hour) return `há ${Math.floor(diffMs / minute)} min`;
  if (diffMs < day) return `há ${Math.floor(diffMs / hour)} h`;
  if (diffMs < week) return `há ${Math.floor(diffMs / day)} dias`;
  if (diffMs < month) return `há ${Math.floor(diffMs / week)} semanas`;
  if (diffMs < year) return `há ${Math.floor(diffMs / month)} meses`;
  return `há ${Math.floor(diffMs / year)} anos`;
}

/**
 * Adiciona dias a uma data
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Verifica se data está dentro de um range
 */
export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  return date >= start && date <= end;
}

/**
 * Calcula diferença em dias entre duas datas
 */
export function daysBetween(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// -----------------------------------------------------------------------------
// UTILITÁRIOS DE VALIDAÇÃO
// -----------------------------------------------------------------------------

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida URL
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida UUID
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Valida telefone brasileiro
 */
export function isValidBrazilianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return /^(\+55)?[1-9]{2}9?[0-9]{8}$/.test(cleanPhone);
}

/**
 * Valida CPF
 */
export function isValidCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  
  return remainder === parseInt(cleanCPF.charAt(10));
}

// -----------------------------------------------------------------------------
// UTILITÁRIOS DE ARRAYS E OBJETOS
// -----------------------------------------------------------------------------

/**
 * Remove duplicatas de array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Remove duplicatas por propriedade
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

/**
 * Agrupa array por propriedade
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const value = String(item[key]);
    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Embaralha array
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Paginação de array
 */
export function paginate<T>(
  array: T[], 
  page: number, 
  perPage: number
): { data: T[]; total: number; page: number; totalPages: number } {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  return {
    data: array.slice(startIndex, endIndex),
    total: array.length,
    page,
    totalPages: Math.ceil(array.length / perPage)
  };
}

/**
 * Busca em array com score de similaridade
 */
export function fuzzySearch<T>(
  array: T[], 
  searchTerm: string, 
  key: keyof T
): { item: T; score: number }[] {
  const results = array.map(item => {
    const text = String(item[key]).toLowerCase();
    const term = searchTerm.toLowerCase();
    
    if (text.includes(term)) {
      const score = term.length / text.length;
      return { item, score };
    }
    
    return null;
  }).filter(Boolean) as { item: T; score: number }[];
  
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Deep clone de objeto
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T;
  if (typeof obj === 'object') {
    const cloned = {} as T;
    Object.keys(obj).forEach(key => {
      (cloned as any)[key] = deepClone((obj as any)[key]);
    });
    return cloned;
  }
  return obj;
}

/**
 * Merge profundo de objetos
 */
export function deepMerge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;
  const source = sources.shift();
  
  if (source) {
    Object.keys(source).forEach(key => {
      const targetValue = (target as any)[key];
      const sourceValue = (source as any)[key];
      
      if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
        if (!targetValue || typeof targetValue !== 'object') {
          (target as any)[key] = {};
        }
        deepMerge((target as any)[key], sourceValue);
      } else {
        (target as any)[key] = sourceValue;
      }
    });
  }
  
  return deepMerge(target, ...sources);
}

// -----------------------------------------------------------------------------
// UTILITÁRIOS DE RANDOMIZAÇÃO E GERAÇÃO
// -----------------------------------------------------------------------------

/**
 * Gera UUID v4
 */
export function generateUUID(): UUID {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Gera string aleatória
 */
export function generateRandomString(length: number, charset?: string): string {
  const chars = charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Gera número aleatório entre min e max
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Gera cor hexadecimal aleatória
 */
export function generateRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// -----------------------------------------------------------------------------
// UTILITÁRIOS ESPECÍFICOS DO MEUPORTALFIT
// -----------------------------------------------------------------------------

/**
 * Converte BudgetRange enum para valores numéricos
 */
export function budgetRangeToNumbers(range: BudgetRange): { min: number; max: number } {
  const ranges: Record<BudgetRange, { min: number; max: number }> = {
    'ate-50': { min: 0, max: 50 },
    '50-100': { min: 50, max: 100 },
    '100-200': { min: 100, max: 200 },
    '200-500': { min: 200, max: 500 },
    'acima-500': { min: 500, max: 2000 }
  };
  
  return ranges[range] || { min: 0, max: 100 };
}

/**
 * Converte valores numéricos para BudgetRange
 */
export function numbersToBudgetRange(min: number, max: number): BudgetRange {
  if (max <= 50) return 'ate-50';
  if (max <= 100) return '50-100';
  if (max <= 200) return '100-200';
  if (max <= 500) return '200-500';
  return 'acima-500';
}

/**
 * Converte LifestyleType para score numérico
 */
export function lifestyleTypeToScore(type: LifestyleType): number {
  const scores: Record<LifestyleType, number> = {
    'sedentario': 1,
    'levemente-ativo': 3,
    'moderadamente-ativo': 5,
    'muito-ativo': 7,
    'extremamente-ativo': 9
  };
  
  return scores[type] || 5;
}

/**
 * Traduz GoalType para português
 */
export function translateGoalType(goal: GoalType): string {
  const translations: Record<GoalType, string> = {
    'weight-loss': 'Perda de peso',
    'muscle-gain': 'Ganho de massa muscular',
    'general-health': 'Saúde geral',
    'energy-boost': 'Aumento de energia',
    'stress-management': 'Controle do stress',
    'sleep-improvement': 'Melhoria do sono',
    'immune-support': 'Fortalecimento imunológico',
    'digestive-health': 'Saúde digestiva',
    'skin-beauty': 'Saúde da pele e beleza',
    'performance': 'Performance física'
  };
  
  return translations[goal] || goal;
}

/**
 * Gera resumo de progresso do quiz
 */
export function calculateQuizProgress(
  currentStep: number,
  totalSteps: number,
  completedSteps: string[] = []
): {
  percentage: number;
  completed: number;
  remaining: number;
  isComplete: boolean;
} {
  const completed = Math.max(completedSteps.length, currentStep - 1);
  const percentage = Math.round((completed / totalSteps) * 100);
  
  return {
    percentage: Math.min(percentage, 100),
    completed,
    remaining: totalSteps - completed,
    isComplete: completed >= totalSteps
  };
}

/**
 * Calcula score de compatibilidade entre usuário e produto
 */
export function calculateProductMatchScore(
  userProfile: any,
  product: any,
  weights: Record<string, number> = {}
): number {
  const defaultWeights = {
    goalAlignment: 0.4,
    priceMatch: 0.2,
    brandPreference: 0.15,
    rating: 0.15,
    availability: 0.1,
    ...weights
  };
  
  let score = 0;
  
  // Goal alignment (40%)
  // Implementar lógica específica baseada nos objetivos
  
  // Price match (20%)
  if (product.price && userProfile.budget_range) {
    const budget = budgetRangeToNumbers(userProfile.budget_range);
    if (product.price >= budget.min && product.price <= budget.max) {
      score += defaultWeights.priceMatch * 100;
    }
  }
  
  // Rating (15%)
  if (product.rating) {
    score += defaultWeights.rating * (product.rating / 5) * 100;
  }
  
  // Availability (10%)
  if (product.in_stock) {
    score += defaultWeights.availability * 100;
  }
  
  return Math.min(Math.round(score), 100);
}

// -----------------------------------------------------------------------------
// UTILITÁRIOS DE PERFORMANCE E DEBUG
// -----------------------------------------------------------------------------

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T, 
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Mede tempo de execução
 */
export async function measureExecutionTime<T>(
  func: () => Promise<T>,
  label?: string
): Promise<{ result: T; executionTime: number }> {
  const start = performance.now();
  const result = await func();
  const executionTime = performance.now() - start;
  
  if (label) {
    console.log(`${label}: ${executionTime.toFixed(2)}ms`);
  }
  
  return { result, executionTime };
}

/**
 * Sleep/delay function
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function com backoff exponencial
 */
export async function retry<T>(
  func: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let attempt = 1;
  
  while (attempt <= maxAttempts) {
    try {
      return await func();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
      attempt++;
    }
  }
  
  throw new Error('Max retry attempts reached');
}

// -----------------------------------------------------------------------------
// EXPORTS DEFAULT
// -----------------------------------------------------------------------------
export default {
  // CSS/Styling
  cn,
  generateGradientClasses,
  generateColorFromString,
  
  // String/Text
  capitalize,
  slugify,
  truncate,
  removeAccents,
  getInitials,
  
  // Numbers/Formatting
  formatCurrency,
  formatBRL,
  formatNumber,
  formatPercentage,
  convertUSDToBRL,
  
  // Date/Time
  formatDate,
  formatRelativeTime,
  addDays,
  daysBetween,
  
  // Validation
  isValidEmail,
  isValidURL,
  isValidUUID,
  
  // Arrays/Objects
  unique,
  uniqueBy,
  groupBy,
  shuffle,
  paginate,
  deepClone,
  deepMerge,
  
  // Random/Generation
  generateUUID,
  generateRandomString,
  randomBetween,
  
  // MeuPortalFit specific
  budgetRangeToNumbers,
  translateGoalType,
  calculateQuizProgress,
  calculateProductMatchScore,
  
  // Performance
  debounce,
  throttle,
  measureExecutionTime,
  sleep,
  retry
};