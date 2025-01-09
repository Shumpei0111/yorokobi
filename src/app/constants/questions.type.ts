export interface Question {
  id: number;
  question: {
    ja: string;
    en: string;
  };
  options: Option[];
}

export interface Option {
  id: string;
  text: {
    ja: string;
    en: string;
  };
  scores: Record<string, number>;
}
