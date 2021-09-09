export interface IStory {
  id: number;
  by: string;
  descendants: number;
  score: number;
  time: number;
  title: string;
  url: string;
  kids?: number[];
}
