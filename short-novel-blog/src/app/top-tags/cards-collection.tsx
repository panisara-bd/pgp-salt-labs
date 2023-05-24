import { PostType } from '@/types';
import PostCard from './card';
import styles from './cards-collection.module.scss';

type Props = {
  posts: PostType[];
};

export default function PostCards({ posts }: Props) {
  return (
    <ul className={styles.cardsContainer}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
