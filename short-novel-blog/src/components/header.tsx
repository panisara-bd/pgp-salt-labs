'use client';

import Link from 'next/link';
import styles from './header.module.scss';
import { useState } from 'react';
import { getPosts } from '@/helpers/getPosts';
import { getAllTags } from '@/helpers/tags';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const search = async () => {
    const posts = await getPosts();
    const tags = getAllTags(posts);
    if (tags.map((tag) => tag.name).includes(searchQuery)) {
      router.push(`/tag/${searchQuery}`);
      setSearchQuery('')
    }
  };

  return (
    <div className={styles.headerContainer}>
      <Link className={styles.logo} href="/">
        Logo
      </Link>
      <div className={styles.subContainer}>
        <div className={styles.searchBarContainer}>
          <svg
            className={styles.searchIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
          <input
            placeholder="Search by typing in category name"
            className={styles.searchBar}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? search() : undefined)}
            value={searchQuery}
          />
        </div>
        <div className={styles.navButtonContainer}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() =>
              isShowDropDown === false
                ? setIsShowDropDown(true)
                : setIsShowDropDown(false)
            }
          >
            <svg
              className={styles.navIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </div>
      </div>
      {isShowDropDown === true ? (
        <nav className={styles.navLinkContainer}>
          <div className={styles.navLinkContainer}>
            <Link
              className={styles.navLink}
              href="/"
              onClick={() => setIsShowDropDown(false)}
            >
              All Categories
            </Link>
            <Link
              className={styles.navLink}
              href="/top-tags"
              onClick={() => setIsShowDropDown(false)}
            >
              Top Categories
            </Link>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
