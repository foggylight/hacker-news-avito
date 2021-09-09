import { Dispatch } from 'react';
import { getStoriesData } from '../api/getData';
import { IStore } from '../models/storeModel';
import { ActionType, updateStories, UPDATE_STORIES } from './actions';

const initialState: IStore = {
  stories: [],
};

const storiesReducer = (state = initialState, action: ActionType): IStore => {
  switch (action.type) {
    case UPDATE_STORIES:
      return { ...state, stories: action.stories };
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

export default storiesReducer;
