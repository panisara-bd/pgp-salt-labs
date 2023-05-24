import { TagCounter } from '@/helpers/tags';
import Link from 'next/link';
import styles from './tags-nav.module.scss';

type Props = {
  tagCounters: TagCounter[];
};

export default function TagNav({ tagCounters }: Props) {
  return (
    <div className={styles.tagNavContainer}>
      <Link className={styles.tagNav} href={'/'}>
        all
      </Link>
      {tagCounters.map((tag) => (
        <Link
          className={`${
            tag.name === tag.name ? styles.tagNav : styles.tagNavActive
          }`}
          href={`/tag/${tag.name}`}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
