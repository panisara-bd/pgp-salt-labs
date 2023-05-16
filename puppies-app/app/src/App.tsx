import { Search } from './Components/Search';
import { PuppyCard } from './Components/PuppyCard';
import { usePuppies } from './PuppiesContext';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const {puppies} = usePuppies();
  console.log(puppies)

  return (
    
    <PageContainer>
      <Header><FontAwesomeIcon icon={faDog} size='sm'/> Puppies Collection </Header>
      <Search />
      <CardsContainer>
      {puppies.map(puppy => <PuppyCard key={puppy._id} puppy={puppy} />)}
      </CardsContainer>
    </PageContainer>
    
  );
}

const PageContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100vh;
  background: #Fbf7f4;
`;

const Header = styled.h1`
  font-size: 50px;
  text-align: center;
  color: #402903;
`

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 800px;
`