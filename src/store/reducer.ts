import { Dispatch } from 'react';
import { getCommentsData, getStoriesData } from '../api/getData';
import { IStore } from '../models/storeModel';
import { ActionType, updateComments, updateStories, UPDATE_COMMENTS, UPDATE_STORIES } from './actions';

const initialState: IStore = {
  stories: [],
  comments: [],
};

const reducer = (state = initialState, action: ActionType): IStore => {
  switch (action.type) {
    case UPDATE_STORIES:
      return { ...state, stories: action.stories };
    case UPDATE_COMMENTS:
      return { ...state, comments: action.comments };
    default:
      return state;
  }
};

export const fetchStories =
  () =>
  async (dispatch: Dispatch<ActionType>): Promise<void> => {
    const response = await getStoriesData();
    dispatch(updateStories(response));
  };

export const fetchComments =
  (ids: number[]) =>
  async (dispatch: Dispatch<ActionType>): Promise<void> => {
    const response = await getCommentsData(ids);
    dispatch(updateComments(response));
  };

export default reducer;
