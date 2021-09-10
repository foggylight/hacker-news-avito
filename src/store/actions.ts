import { IComment } from '../models/commentModel';
import { IStory } from '../models/storyModel';

export const UPDATE_STORIES = 'UPDATE_STORIES';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';

interface IStoriesAction {
  type: typeof UPDATE_STORIES;
  stories: IStory[];
}

interface ICommentsAction {
  type: typeof UPDATE_COMMENTS;
  comments: IComment[];
}

export type ActionType = IStoriesAction | ICommentsAction;

export const updateStories = (stories: IStory[]): IStoriesAction => {
  return {
    type: UPDATE_STORIES,
    stories,
  };
};

export const updateComments = (comments: IComment[]): ICommentsAction => {
  return {
    type: UPDATE_COMMENTS,
    comments,
  };
};
