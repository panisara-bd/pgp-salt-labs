'use client';

import { TagCounter } from '@/helpers/tags';
import { PostType } from '@/types';
import React, { useEffect } from 'react';
import PostCard from './post-card';

type Props = {
  tagCounter: TagCounter;
  posts: PostType[];
};

export default function Tag({ tagCounter, posts }: Props) {
  const [isOpened, setIsOpened] = React.useState(true);
  const tagPosts = posts.filter((post) => post.tags.includes(tagCounter.name));
  const toggleIsOpened = () => setIsOpened(!isOpened);

  return (
    <div>
      <h2 onClick={toggleIsOpened}>
        {tagCounter.name} ({tagCounter.count} posts)
      </h2>
      {isOpened && (
        <ul>
          {tagPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}
