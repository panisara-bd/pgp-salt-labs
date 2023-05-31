import styled from 'styled-components';
import { colors } from '../helpers/colors';
import { SearchBar } from '@/components/SearchBar';
import { useEffect, useState } from 'react';
import { searchProducts } from '@/helpers/productsApi';
import { ProductType } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { FilterByTypes } from '@/components/FilterByTypes';

const useDebouncedSearch = (
  fetchFn: () => void,
  query: string,
  checkedTypes: string[]
) => {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (query === '') {
      fetchFn();
      return;
    }

    const timeout = setTimeout(fetchFn, 500);
    setDebounceTimeout(timeout);
  }, [query, checkedTypes]);
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [checkedTypes, setCheckedTypes] = useState<string[]>([]);

  const fetchSearchResult = async () => {
    const results = await searchProducts(searchQuery, checkedTypes);
    setProducts(results);
  };

  useDebouncedSearch(fetchSearchResult, searchQuery, checkedTypes);

  return (
    <ContentWraper>
      <SearchWrapper>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterByTypes
          checkedTypes={checkedTypes}
          setCheckedTypes={setCheckedTypes}
        />
      </SearchWrapper>
      {searchQuery !== '' || checkedTypes.length ? (
        <ResultChipsContainer>
          Results for{' '}
          {searchQuery !== '' && <SearchQuery>{searchQuery}</SearchQuery>}
          {checkedTypes.map((type) => (
            <SearchQuery isFilter key={type}>
              {type}
            </SearchQuery>
          ))}
        </ResultChipsContainer>
      ) : null}
      <ProductsCount>{products.length} products</ProductsCount>
      <CardsContainer>
        {products.map((milk) => (
          <ProductCard key={milk.id} product={milk} id={milk.id} />
        ))}
      </CardsContainer>
    </ContentWraper>
  );
}

const ContentWraper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin-inline: 30px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

const CardsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 47px;
`;

const ResultChipsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px;
  padding-bottom: 0;
  font-weight: 600;
  color: ${colors.dark};
`;

const SearchQuery = styled.span<{ isFilter?: boolean }>`
  background: ${(props) =>
    props.isFilter ? 'rgba(0,0,0,0.1)' : 'rgba(255, 255, 255, 0.2)'};
  padding: 5px 15px;
  border-radius: 20px;
`;

const ProductsCount = styled.p`
  color: ${colors.darkPink};
  padding-left: 10px;
`;
