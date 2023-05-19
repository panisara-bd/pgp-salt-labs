import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { LoaderFunction, Outlet } from 'react-router-dom';
import { colors } from '../helpers/theme';
import { PuppiesType } from '../types';
import { getAllPuppies } from '../helpers/puppiesApi';

type LoaderData = {
  puppies: PuppiesType[];
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const result = await getAllPuppies();
  return { puppies: result };
};

export default function RootRoute() {
  return (
    <PageContainer>
      <Header>
        <FontAwesomeIcon icon={faDog} size="sm" style={{ paddingRight: 15 }} />
        Puppies Collection
      </Header>
      <Outlet />
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
