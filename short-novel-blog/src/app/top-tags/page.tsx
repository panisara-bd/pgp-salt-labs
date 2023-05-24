import { getPosts } from '@/helpers/getPosts';
import { getAllTags } from '@/helpers/tags';
import styles from 'src/app/page-setter.module.scss';
import Tag from '@/components/tag';
import TagNav from '@/components/tags-nav';

export default async function Page() {
  const posts = await getPosts();
  const topFiveTagCounters = getAllTags(posts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.header}>Top 5 categories</h2>
      <TagNav tagCounters={topFiveTagCounters} />
      {topFiveTagCounters.map((tagCounter) => (
        <Tag key={tagCounter.name} tagCounter={tagCounter} posts={posts} />
      ))}
    </div>
  );
}
