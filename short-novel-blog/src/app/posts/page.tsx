import { getPosts } from '@/helpers/getPosts';
import { getTopTags } from '@/helpers/tags';
import Tag from './tag';

type TagCounter = {
  name: string;
  count: number;
};

export default async function Page() {
  const posts = await getPosts();
  const tagCounters = getTopTags(posts);

  return (
    <div>
      {tagCounters.map((tagCounter) => (
        <Tag tagCounter={tagCounter} posts={posts} />
      ))}
    </div>
  );
}
