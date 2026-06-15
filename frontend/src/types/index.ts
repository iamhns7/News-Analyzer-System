export interface Article {
  id: number;
  title: string;
  aiSummary: string;
  originalContent: string;
  trustScore: number;
  isFake: boolean;
  imageUrl: string | null;
  url: string;
}

export interface Stat {
  label: string;
  value: string | number;
  iconName: string;
}
