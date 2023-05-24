import { getPostById } from '@/helpers/getPosts';
import styles from 'src/app/page-setter.module.scss';

type Props = {
  params: { id: string };
};

export default async function Article({ params }: Props) {
  const id = params.id;
  const post = await getPostById(id);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.header}>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
