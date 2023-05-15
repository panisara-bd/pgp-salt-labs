import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCakeCandles,
  faLocationDot,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { User } from '../type';
import { NameChangeForm } from './NameChangeForm';

export const CardContent = () => {
  const [user, setUser] = useState<User>();
  const [newName, setNewName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isNewName, setIsNewName] = useState(false);

  const location = user?.location;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const result = await response.json();
        setUser((previousUser) => previousUser || result.results[0]);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  console.log(user);

  return !user ? (
    <CardContainer style={{ alignItems: 'center', height: 540, width: 350 }}>
      <Loader />
    </CardContainer>
  ) : (
    <CardContainer>
      <NameContainer>
        {isNewName === false || newName === '' ? (
          <NameText>{`${user!.name.first} ${user!.name.last}`}</NameText>
        ) : (
          <NameText>{newName}</NameText>
        )}
        <ButtonIcon
          onClick={() => {
            showForm === false ? setShowForm(true) : setShowForm(false);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} size="xl" />
        </ButtonIcon>
      </NameContainer>
      {showForm ? (
        <NameChangeForm
          setShowForm={setShowForm}
          setIsNewName={setIsNewName}
          setNewName={setNewName}
          newName={newName}
        />
      ) : null}

      <ContentText>
        {' '}
        <FontAwesomeIcon
          icon={faCakeCandles}
          size="sm"
          style={{ paddingInline: 10 }}
        />
        {user.dob.date.split('T')[0]} yrs({user.dob.age} yrs)
      </ContentText>

      {!location ? (
        <ContentText>Location is not available</ContentText>
      ) : (
        <>
          <ContentText>
            <FontAwesomeIcon
              icon={faLocationDot}
              size="sm"
              style={{ paddingInline: 10 }}
            />
            {`${location.street.number} ${location.street.name}, ${location.city}, ${location?.country}, ${location?.postcode}`}
          </ContentText>
        </>
      )}
      <Image src={user.picture.large} alt="profile picture" />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  padding: 40px;
  flex-direction: column;
  max-width: 350px;
  justify-content: center;
  background: rgb(211, 211, 211, 0.3);
  border-radius: 15px;
  margin: 20px;

  @media (max-width: 425px) {
    padding: 20px;
    max-width: 300px;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NameText = styled.p`
  margin: 0;
  font-family: 'Mukta', sans-serif;
  font-size: 30px;
  line-height: 60px;

  @media (max-width: 425px) {
    font-size: 26px;
  }
`;

const ButtonIcon = styled.button`
  background: none;
  border: none;
`;

const Image = styled.img`
  padding: 10px 0 20px 0;
  max-width: 350px;
`;

const ContentText = styled.p`
  margin: 0;
  font-family: system-ui;
  font-size: 16px;
  line-height: 30px;
`;

const Loader = styled.div`
  align-content: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
  } 
`;
