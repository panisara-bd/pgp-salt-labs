import { PostType } from '../types';

export const getPosts = async (): Promise<PostType[]> => {
  const response = await fetch('https://dummyjson.com/posts', {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Could not fetch posts.');
  }
  const result = await response.json();
  return result.posts;
};

export const getPostById = async (
  id: string
): Promise<PostType> => {
  const response = await fetch(`https://dummyjson.com/posts/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Could not fetch post.');
  }
  return response.json();
};
