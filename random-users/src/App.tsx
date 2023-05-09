import { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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
  dob: { age: number };
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
        <ButtonSave type="submit">Save</ButtonSave>
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
    <div>Loading</div>
  ) : (
    <PageContainer>
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

        <ContentText>Age: {user.dob.age}</ContentText>
        {!location ? (
          <ContentText>Location is not available</ContentText>
        ) : (
          <>
            <ContentText>Address:</ContentText>
            <ContentText>
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
  height: 100vh;
  background: #2e8b57;
`;
const CardContainer = styled.div`
  display: flex;
  padding: 40px;
  flex-direction: column;
  max-width: 350px;
  align-content: center;
  justify-content: center;
  background: rgba(254, 254, 254, 0.2);
  border-radius: 15px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NameText = styled.p`
  margin: 0;
  font-family: system-ui;
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
  width: 250px;
`;

const ButtonSave = styled.button`
  background: #2e8b57;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
`;

const Image = styled.img`
  padding: 10px 0 20px 0;
  width: 350px;
`;

const ContentText = styled.p`
  margin: 0;
  font-family: system-ui;
  font-size: 20px;
  line-height: 30px;
`;
