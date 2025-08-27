// =============================================================================
// MEUPORTALFIT - DADOS DAS PERGUNTAS DO QUIZ
// =============================================================================

export interface QuizOption {
  value: string;
  label: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: QuizOption[];
  required?: boolean;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: "Qual é seu principal objetivo de saúde?",
    subtitle: "Escolha sua prioridade #1 para 2025",
    options: [
      { value: "weight_loss", label: "�� Perder peso e definir o corpo", description: "Queimar gordura e ganhar massa magra" },
      { value: "energy", label: "⚡ Ganhar energia e disposição", description: "Mais ânimo para o dia a dia" },
      { value: "sleep", label: "😴 Melhorar qualidade do sono", description: "Dormir melhor e acordar descansado" },
      { value: "stress", label: "🧘 Reduzir estresse e ansiedade", description: "Mais calma e equilíbrio mental" }
    ],
    required: true
  }
];

export const calculateProgress = (currentQuestion: number): number => {
  return Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100);
};
