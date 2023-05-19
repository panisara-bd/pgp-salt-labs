import { useState } from 'react';
import { PuppiesType } from '../types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../helpers/theme';
import { Link } from 'react-router-dom';
import { searchPuppy } from '../helpers/puppiesApi';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PuppiesType[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  const fetchSearchResult = async (query: string) => {
    const results = await searchPuppy(query);
    setSearchResults(results);
  };

  const onSearchChange = async (query: string) => {
    setSearchQuery(query);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => fetchSearchResult(query), 500);
    setDebounceTimeout(timeout);
  };

  return (
    <SearchBoxContainer>
      <SearchIcon>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchIcon>
      <SearchBoxInput
        type="search"
        placeholder="Search puppy by name or breed ex. Beagle"
        onChange={(event) => onSearchChange(event.target.value)}
        value={searchQuery}
      />
      {searchResults.map((puppy) => (
        <SearchResults key={puppy._id} to={puppy._id!}>
          {puppy.name}
        </SearchResults>
      ))}
    </SearchBoxContainer>
  );
};

const SearchBoxContainer = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
`;

const SearchIcon = styled.div`
  position: absolute;
  padding: 9px 0 0 12px;
`;

const SearchBoxInput = styled.input`
  border: none;
  padding: 10px;
  border-radius: 20px;
  padding-left: 40px;
  width: 400px;
  font-size: 16px;
  background: #fff;

  @media (max-width: 530px) {
    width: 250px;
  }
`;

const SearchResults = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${colors.dark};
  padding: 10px 25px;
  background: #fff;
  width: 320px;
  margin-left: 20px;
  font-family: system-ui;
  border-bottom: 3px solid ${colors.lightgray};

  &:hover {
    background: ${colors.blue};
  }

  @media (max-width: 530px) {
    width: 170px;
  }
`;
