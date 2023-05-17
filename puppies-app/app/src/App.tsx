import { Search } from './Components/Search';
import { PuppyCard } from './Components/PuppyCard';
import { usePuppies } from './helpers/PuppiesContext';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { colors } from './helpers/theme';
import { AddPuppyForm } from './Components/AddPuppyForm';

export default function App() {
  const { puppies } = usePuppies();

  return (
    <PageContainer>
      <Header>
        <FontAwesomeIcon icon={faDog} size="sm" /> Puppies Collection
      </Header>{' '}
      <Search />
      <CardsContainer>
        {puppies.map((puppy) => (
          <PuppyCard key={puppy._id} puppy={puppy} />
        ))}
      </CardsContainer>
      <AddPuppyForm />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Header = styled.h1`
  font-size: 50px;
  text-align: center;
  color: ${colors.dark};
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 900px;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  margin: 20px;
  margin-bottom: 0;
  flex-wrap: wrap;

  @media (max-width: 425px) {
    flex-direction: column;
    align-items: center;
  }
`;
