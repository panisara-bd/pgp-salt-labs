import { getPosts } from '@/helpers/getPosts';
import { getAllTags } from '@/helpers/tags';
import styles from './page-setter.module.scss';
import Tag from '@/components/tag';
import TagNav from '@/components/tags-nav';

export default async function Home() {
  const posts = await getPosts();
  const tagCounters = getAllTags(posts);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.header}>All categories</h2>
      <TagNav tagCounters={tagCounters} />
      {tagCounters.map((tagCounter) => (
        <Tag tagCounter={tagCounter} posts={posts} />
      ))}
    </div>
  );
}
