import React from 'react';

type Props = {
  count: number;
  limit: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination = ({ count, limit, setOffset }: Props) => {
  const numberOfPages = Math.ceil(count / limit);
  const pages = new Array(numberOfPages).fill(0).map((_, index) => index + 1);

  return (
    <div>
      {pages.map((page) => (
        <button key={page} onClick={() => setOffset((page - 1) * limit)}>{page}</button>
      ))}
    </div>
  );
};
