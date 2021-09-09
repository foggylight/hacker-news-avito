import { IStory } from '../models/storyModel';

export const UPDATE_STORIES = 'UPDATE_STORIES';

export interface IStoriesAction {
  type: typeof UPDATE_STORIES;
  stories: IStory[];
}

export type ActionType = IStoriesAction;

export const updateStories = (stories: IStory[]): IStoriesAction => {
  return {
    type: UPDATE_STORIES,
    stories,
  };
};
