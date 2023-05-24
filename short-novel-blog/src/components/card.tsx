import { PostType } from '@/types';
import Link from 'next/link';
import styles from './card.module.scss';

type Props = {
  post: PostType;
};

export default function PostCard({ post }: Props) {
  const randomizeColors = Math.floor(Math.random() * 16777215).toString(16);
  const randomColor: string[] = [];

  // console.log(randomColor.push(`#${randomizeColors}`));

  return (
    <li className={styles.cardContainer}>
      <Link className={styles.cardDetail} href={`/posts/${post.id}`}>
        {post.title}
      </Link>
      <div className={styles.cardTagsContainer}>
        {post.tags.map((tag) => (
          <Link className={styles.cardTag} href={`/tag/${tag}`}>
            {tag}
          </Link>
        ))}
      </div>
    </li>
  );
}
