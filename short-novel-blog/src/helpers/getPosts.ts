import { PostType } from '@/types';

export const getPosts = async () => {
  const response = await fetch('https://dummyjson.com/posts');
  return response.json();
};

export const getPostById = async (id: string): Promise<PostType> => {
  const response = await fetch(`https://dummyjson.com/posts/${id}`)
  return response.json();
}