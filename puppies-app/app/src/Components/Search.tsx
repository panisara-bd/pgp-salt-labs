import { useState } from 'react';
import { PuppiesType } from '../types';
import { PuppyCard } from './PuppyCard';

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<PuppiesType[]>([]);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();
    const [selectedPuppy, setSelectedPuppy] = useState<PuppiesType>();

    const fetchSearchResult = async (query: string) => {
      try {
        const response = await fetch(`http://localhost:8080/api/puppies/search?query=${query}`);
        const results = await response.json();
        setSearchResults(results);
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
    setSelectedPuppy(result.puppy)
  }

  
  return (
    <>
      <input
        type="search"
        placeholder="Search here"
        onChange={(event) => onSearchChange(event.target.value)}
        value={searchQuery}
      />
      <ul>
      {searchResults.map((puppy) => (<li key={puppy._id} onClick={() => handleClick(puppy._id!)}>{puppy.name}</li>))}
      </ul>
      {!selectedPuppy ? null :
      <PuppyCard puppy={selectedPuppy} />}
    </>
  );
}
