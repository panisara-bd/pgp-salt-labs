import { getPosts } from '@/helpers/getPosts';
import { PostType } from '@/types';
import Link from 'next/link';

export default async function Page() {
  const { posts } = await getPosts();
  return (
    <div>
      <ul>
        {posts.map((post: PostType) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
