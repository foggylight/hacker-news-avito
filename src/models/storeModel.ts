import { IComment } from './commentModel';
import { IStory } from './storyModel';

export interface IStore {
  stories: IStory[];
  comments: IComment[];
}
