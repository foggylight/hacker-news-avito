import { IStory } from '../models/StoryModel';
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
