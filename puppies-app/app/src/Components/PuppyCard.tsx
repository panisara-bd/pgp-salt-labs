import styled from 'styled-components';
import { PuppiesType } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCakeCandles,
  faPaw,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useState } from 'react';
import { usePuppies } from '../PuppiesContext';

type Props = {
  puppy: PuppiesType;
};

export const PuppyCard = ({ puppy }: Props) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [newName, setNewName] = useState(puppy.name);
  const [newBirthDate, setNewBirthDate] = useState(puppy.birthdate);
  const [newBreed, setNewBreed] = useState(puppy.breed);

  const { fetchPuppies } = usePuppies();

  const updatePuppy = async () => {
    try {
      await fetch(`http://localhost:8080/api/puppies/${puppy._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          birthdate: newBirthDate,
          breed: newBreed,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setShowUpdateForm(false);
    await updatePuppy();
    fetchPuppies();
  };

  return (
    <CardContainer>
      <ButtonIcon
        onClick={() => {
          showUpdateForm === false
            ? setShowUpdateForm(true)
            : setShowUpdateForm(false);
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} size="xl" />
      </ButtonIcon>

      {showUpdateForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          />
          <FontAwesomeIcon
            icon={faCakeCandles}
            size="sm"
            style={{ paddingInline: 10 }}
          />
          <input
            type="text"
            onChange={(e) => setNewBirthDate(e.target.value)}
            value={newBirthDate}
          />
          <FontAwesomeIcon
            icon={faPaw}
            size="sm"
            style={{ paddingInline: 10 }}
          />
          <input
            type="text"
            onChange={(e) => setNewBreed(e.target.value)}
            value={newBreed}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <NameText>{puppy.name}</NameText>
          <ContentText>
            <FontAwesomeIcon
              icon={faCakeCandles}
              size="sm"
              style={{ paddingInline: 10, paddingTop: 10 }}
            />
            {puppy.birthdate}
            </ContentText>
            <ContentText>
            <FontAwesomeIcon
              icon={faPaw}
              size="sm"
              style={{ paddingInline: 10 }}
            />
            {puppy.breed}
            </ContentText>
        </div>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 200px;
  justify-content: center;
  background: #fff;
  border-radius: 15px;
  margin: 20px;
  position: relative;

  @media (max-width: 425px) {
    padding: 20px;
    max-width: 300px;
  }
`;

const NameText = styled.h1`
  margin: 0;
  font-size: 30px;
  padding-inline: 10px;
  padding-bottom: 20px;
`;

const ContentText = styled.p`
  margin: 0;
  font-family: system-ui;
  font-size: 16px;
  line-height: 30px;
`;

const ButtonIcon = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 15px;
  right: 13px;
`;
