import { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCakeCandles,
  faLocationDot,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';

type Location = {
  street: {
    name: string;
    number: number;
  };
  city: string;
  country: string;
  postcode: number;
};

type User = {
  picture: {
    large: string;
  };
  name: {
    first: string;
    last: string;
  };
  dob: {
    age: number;
    date: string;
  };
  location: Location;
};

export default function App() {
  const [user, setUser] = useState<User>();
  const location = user?.location;
  const [newName, setNewName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isNewName, setIsNewName] = useState(false);

  const NameChangeForm = () => {
    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      setShowForm(false);
      setIsNewName(true);
    };

    return (
      <FormContainer onSubmit={handleSubmit}>
        <NameInput
          type="text"
          name="name"
          autoFocus={true}
          value={newName}
          placeholder="Type in new name here"
          onChange={(event) => setNewName(event.target.value)}
        />
        <ButtonMain type="submit">Save</ButtonMain>
      </FormContainer>
    );
  };

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
    <PageContainer>
      <Header>Randomize Users</Header>
      <ButtonMain
         style={{ marginBottom: 30, fontSize: 18, color: '#006400' }}
        onClick={() => window.location.reload()}
      >
        Get new user 👽
      </ButtonMain>
      <CardContainer style={{ alignItems: 'center', height: 540, width: 350}}>
        <Loader />
      </CardContainer>
    </PageContainer>
  ) : (
    <PageContainer>
      <Header>Randomize Users</Header>
      <ButtonMain
        style={{ marginBottom: 30, fontSize: 18, color: '#006400' }}
        onClick={() => window.location.reload()}
      >
        Click to reload!
      </ButtonMain>
      <CardContainer>
        <NameContainer>
          {isNewName === false ? (
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
        {showForm ? <NameChangeForm /> : null}

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
    </PageContainer>
  );
}

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
`;

const CardContainer = styled.div`
  display: flex;
  padding: 40px;
  flex-direction: column;
  max-width: 350px;
  align-content: center;
  justify-content: center;
  background: rgb(211, 211, 211, 0.3);
  border-radius: 15px;
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
`;

const ButtonIcon = styled.button`
  background: none;
  border: none;
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NameInput = styled.input`
  border: none;
  background: rgba(254, 254, 254, 0.5);
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  font-family: 'Mukta', sans-serif;
  width: 250px;
`;

const ButtonMain = styled.button`
  background: #9acd32;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-family: 'Mukta', sans-serif;
`;

const Image = styled.img`
  padding: 10px 0 20px 0;
  max-width: 350px;
`;

const ContentText = styled.p`
  margin: 0;
  font-family: system-ui;
  font-size: 20px;
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
