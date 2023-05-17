import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PuppiesType } from '../types';

type PuppiesContextType = {
  puppies: PuppiesType[];
  fetchPuppies: () => void;
};

export const PuppiesContext = React.createContext<PuppiesContextType>({
  puppies: [],
  fetchPuppies: () => {},
});

export const usePuppies = () => useContext(PuppiesContext);

export const PuppiesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [puppies, setPuppies] = useState<PuppiesType[]>([]);

  const fetchPuppies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/puppies');
      const result = await response.json();
      setPuppies(result);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPuppies();
  }, []);

  return (
    <PuppiesContext.Provider value={{ puppies, fetchPuppies }}>
      {children}
    </PuppiesContext.Provider>
  );
};
