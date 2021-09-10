export interface IStory {
  id: number;
  by: string;
  score: number;
  time: number;
  title: string;
  url: string;
  kids?: number[];
}
