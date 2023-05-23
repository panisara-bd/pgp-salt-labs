import { PostType } from '@/types';
import Link from 'next/link';

type Props = {
  post: PostType;
};

export default function PostCard({ post }: Props) {
  return (
    <li>
      <Link href={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  );
}
