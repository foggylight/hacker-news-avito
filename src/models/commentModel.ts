export interface IComment {
  id?: number;
  deleted?: boolean;
  by: string;
  time: number;
  text: string;
  kids?: number[];
  kidsData?: IComment[];
}
