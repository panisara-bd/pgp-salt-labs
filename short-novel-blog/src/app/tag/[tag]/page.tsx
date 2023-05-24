import Tag from '@/components/tag';
import TagNav from '@/components/tags-nav';
import { getPosts } from '@/helpers/getPosts';
import { getAllTags } from '@/helpers/tags';
import styles from 'src/app/page-setter.module.scss';

type Props = {
  params: { tag: string };
};

export default async function PostsByTag({ params }: Props) {
  const posts = await getPosts();
  const tagName = params.tag;
  const allTags = getAllTags(posts);
  const matchedTagName = allTags.find((tag) => tag.name == tagName);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.header}>{tagName}</h2>
      <TagNav tagCounters={allTags} params={tagName}/>
      {matchedTagName ? (
        <Tag tagCounter={matchedTagName} posts={posts} />
      ) : (
        <div>Tag not found</div>
      )}
    </div>
  );
}
