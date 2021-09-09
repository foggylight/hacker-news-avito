export const API_URL = 'https://hacker-news.firebaseio.com/v0/';

export const getDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};
