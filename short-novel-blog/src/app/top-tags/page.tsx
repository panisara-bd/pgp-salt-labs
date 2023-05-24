import { getPosts } from '@/helpers/getPosts';
import { getAllTags } from '@/helpers/tags';
import Tag from './tag';
import styles from './page.module.scss';

export default async function Page() {
  const posts = await getPosts();
  const topFiveTagCounters = getAllTags(posts).sort((a, b) => b.count - a.count).slice(0, 5);;

  return (
    <div className={styles.pageContainer}>
      {topFiveTagCounters.map((tagCounter) => (
        <Tag tagCounter={tagCounter} posts={posts} />
      ))}
    </div>
  );
}
