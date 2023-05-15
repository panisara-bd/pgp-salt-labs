import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from './type';
import { CardContent } from './components/CardContent';
import { ButtonMain } from './components/ButtonMain';

export default function App() {

  return  (
    <PageContainer>
      <Header>Randomize Users</Header>
      <ButtonMain
        style={{ marginBottom: 30, fontSize: 18, color: '#006400' }}
        onClick={() => window.location.reload()}
      >
        Get new user 👽
      </ButtonMain>
        <CardContent />
    </PageContainer>
  ) }

const PageContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgb(190, 245, 119);
  background: radial-gradient(
    circle,
    rgba(190, 245, 119, 1) 0%,
    rgba(245, 245, 245, 1) 62%
  );
`;

const Header = styled.h1`
  font-size: 50px;

  @media (max-width: 425px) {
    font-size: 30px;
  }
`;

