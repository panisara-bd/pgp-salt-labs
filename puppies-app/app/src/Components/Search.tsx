import { useState } from 'react';
import { PuppiesType } from '../types';
import { PuppyCard } from './PuppyCard';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PuppiesType[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();
  const [selectedPuppy, setSelectedPuppy] = useState<PuppiesType>();

  const fetchSearchResult = async (query: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/puppies/search?query=${query}`
      );
      if (response.ok) {
      const results = await response.json();
      setSearchResults(results);}
      else {
        setSearchResults([])
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onSearchChange = async (query: string) => {
    setSearchQuery(query);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => fetchSearchResult(query), 500);
    setDebounceTimeout(timeout);
  };

  const handleClick = async (id: string) => {
    const response = await fetch(`http://localhost:8080/api/puppies/${id}`);
    const result = await response.json();
    setSelectedPuppy(result.puppy);
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
          <SearchResults key={puppy._id} onClick={() => handleClick(puppy._id!)}>
            {puppy.name}
          </SearchResults>
        ))}
      {!selectedPuppy ? null : <PuppyCard puppy={selectedPuppy} />}
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
`

const SearchBoxInput = styled.input`
  border: none;
  padding: 10px;
  border-radius: 20px;
  padding-left: 40px;
  width: 400px;
  font-size: 16px;

  @media (max-width: 425px) {
    width: 250px;
  }
`;

const SearchResults = styled.li`
  list-style: none;
  padding: 10px;
  padding-left: 30px;
  background: #fff;
  width: 320px;
  margin-left: 20px;
  font-family: system-ui;
  border-bottom: 3px solid #fafafa;

  &:hover {
    background: #D0F46F;}
`