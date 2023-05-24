'use client';

import { TagCounter } from '@/helpers/tags';
import { PostType } from '@/types';
import React from 'react';

import styles from './tag.module.scss';
import PostCards from './cards-collection';

type Props = {
  tagCounter: TagCounter;
  posts: PostType[];
};

export default function Tag({ tagCounter, posts }: Props) {
  const [isOpened, setIsOpened] = React.useState(true);
  const tagPosts = posts.filter((post) => post.tags.includes(tagCounter.name));
  const toggleIsOpened = () => setIsOpened(!isOpened);

  return (
    <div className={styles.tagContainer}>
      <h2 className={styles.tagHeader} onClick={toggleIsOpened}>
        {tagCounter.name}
        <span className={styles.tagCounts}>{tagCounter.count} posts</span>
      </h2>{' '}
      {isOpened && <PostCards posts={tagPosts} />}
    </div>
  );
}
