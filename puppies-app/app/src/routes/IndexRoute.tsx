import { Search } from '../components/Search';
import { PuppyCard } from '../components/PuppyCard';
import styled from 'styled-components';
import { AddPuppyForm } from '../components/AddPuppyForm';
import { ActionFunction, useRouteLoaderData } from 'react-router-dom';
import { PuppiesType } from '../types';
import { addPuppy } from '../helpers/puppiesApi';

export const action: ActionFunction = async ({ request }) => {
  if (request.method.toLowerCase() === 'post') {
    const fields = Object.fromEntries(await request.formData()) as PuppiesType;
    await addPuppy(fields);
    return null;
  }

  throw new Response('', { status: 405, statusText: 'Method Not Allowed' });
};

export default function IndexRoute() {
  const { puppies } = useRouteLoaderData('root') as { puppies: PuppiesType[] };

  return (
    <>
      <Search />
      <CardsContainer>
        {puppies.map((puppy) => (
          <PuppyCard key={puppy._id} puppy={puppy} />
        ))}
      </CardsContainer>
      <AddPuppyForm />
    </>
  );
}

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 900px;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  margin: 20px;
  margin-bottom: 80px;
  flex-wrap: wrap;

  @media (max-width: 530px) {
    flex-direction: column;
    align-items: center;
  }
`;
