import { TagCounter } from '@/helpers/tags';
import Link from 'next/link';
import styles from './tags-nav.module.scss';

type Props = {
  tagCounters: TagCounter[];
  activeTag?: string;
};

export default function TagNav({ tagCounters, activeTag }: Props) {
  return (
    <div className={styles.tagNavContainer}>
      <Link
        className={`${
          activeTag === undefined ? styles.tagNavActive : styles.tagNav
        }`}
        href={'/'}
      >
        all
      </Link>
      {tagCounters.map((tag) => (
        <Link
          key={tag.name}
          className={`${
            tag.name === activeTag ? styles.tagNavActive : styles.tagNav
          }`}
          href={`/tag/${tag.name}`}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
