export interface Article {
  id: number;
  title: string;
  originalContent: string;
  imageUrl: string | null;
  url: string;
  source: {
    name: string;
  };
  analysis: {
    aiSummary: string;
    trustScore: number;
    isFake: boolean;
  };
}

export interface Stat {
  label: string;
  value: string | number;
  iconName: string;
}
