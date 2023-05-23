import { PostType } from '@/types';

export type TagCounter = {
  name: string;
  count: number;
};

export const getTopTags = (posts: PostType[]): TagCounter[] => {
  const tagCounters: TagCounter[] = [];
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const index = tagCounters.findIndex((counter) => counter.name === tag);
      if (index === -1) {
        tagCounters.push({ name: tag, count: 1 });
      } else {
        tagCounters[index].count++;
      }
    });
  });

  tagCounters.sort((a, b) => b.count - a.count);
  return tagCounters.slice(0, 5);
};
