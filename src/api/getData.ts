import { IComment } from '../models/commentModel';
import { IStory } from '../models/storyModel';
import { API_URL } from '../utils';

export const getStoryData = async (id: number): Promise<IStory> => {
  const response = await fetch(`${API_URL}item/${id}.json`);
  const data = await response.json();
  return data;
};

export const getStoriesIds = async (): Promise<number[]> => {
  const response = await fetch(`${API_URL}newstories.json`);
  const data = await response.json();
  return data.slice(0, 100);
};

export const getStoriesData = async (): Promise<IStory[]> => {
  const ids = await getStoriesIds();
  const data = await Promise.all(ids.map(id => getStoryData(id)));
  return data;
};

export const getCommentData = async (id: number): Promise<IComment> => {
  const response = await fetch(`${API_URL}item/${id}.json`);
  const data: IComment = await response.json();
  if (data.kids) {
    data.kidsData = await Promise.all(data.kids.map(kidsId => getCommentData(kidsId)));
  }
  return data;
};

export const getCommentsData = async (ids: number[]): Promise<IComment[]> => {
  const data = await Promise.all(ids.map(id => getCommentData(id)));
  return data;
};
