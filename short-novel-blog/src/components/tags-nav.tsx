import { TagCounter } from '@/helpers/tags';
import Link from 'next/link';
import styles from './tags-nav.module.scss';

type Props = {
  tagCounters: TagCounter[];
  params: string ;
};

export default function TagNav({ tagCounters, params }: Props) {
console.log(params);

  return (
    <div className={styles.tagNavContainer}>
      <Link className={`${
            params === undefined ? styles.tagNavActive : styles.tagNav
          }`} href={'/'}>
        all
      </Link>
      {tagCounters.map((tag) => (
        <Link
          className={`${
            tag.name === params ? styles.tagNavActive : styles.tagNav
          }`}
          href={`/tag/${tag.name}`}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
